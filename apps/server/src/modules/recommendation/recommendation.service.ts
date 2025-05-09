import { Inject, Injectable } from '@nestjs/common';
import { eq, sql, ne, inArray, desc } from 'drizzle-orm';
import { DB, DbType } from '../global/providers/db.provider';
import { tag, user, user_tag_clicks, work } from '@kkkang/schema';

@Injectable()
export class RecommendationService {
  constructor(@Inject(DB) private db: DbType) {}

  // 计算Pearson相关系数
  private calculatePearsonSimilarity(userA: number[], userB: number[]): number {
    const n = userA.length;
    const sumA = userA.reduce((a, b) => a + b, 0);
    const sumB = userB.reduce((a, b) => a + b, 0);
    const sumASq = userA.reduce((a, b) => a + b ** 2, 0);
    const sumBSq = userB.reduce((a, b) => a + b ** 2, 0);
    const pSum = userA.reduce((a, b, i) => a + b * userB[i], 0);
    const numerator = pSum - (sumA * sumB) / n;
    const denominator = Math.sqrt(
      (sumASq - sumA ** 2 / n) * (sumBSq - sumB ** 2 / n),
    );
    return denominator === 0 ? 0 : numerator / denominator;
  }

  // 获取用户的兴趣向量（基于标签点击次数）
  private async getUserInterestVector(userId: string): Promise<number[]> {
    // 获取所有标签（按时间排序，保证向量一致）
    const allTags = await this.db.select().from(tag).orderBy(tag.createdAt);
    const tagNames = allTags.map((t) => t.name);

    // 获取用户的点击记录
    const userClicks = await this.db
      .select()
      .from(user_tag_clicks)
      .where(eq(user_tag_clicks.userId, userId));

    // 构建向量：未点击的标签填充0
    return tagNames.map((tagName) => {
      const click = userClicks.find((c) => c.tagName === tagName);
      return click ? click.clickCount : 0;
    });
  }

  // 获取推荐商品
  async getRecommendations(
    userId: string,
  ): Promise<(typeof work.$inferSelect)[]> {
    // 1. 获取当前用户的兴趣向量
    const currentUserVector = await this.getUserInterestVector(userId);

    // 2. 获取所有其他用户的兴趣向量
    const allUsers = await this.db
      .select()
      .from(user)
      .where(ne(user.id, userId));

    const usersSimilarity = await Promise.all(
      allUsers.map(async (user) => {
        const otherUserVector = await this.getUserInterestVector(user.id);
        const similarity = this.calculatePearsonSimilarity(
          currentUserVector,
          otherUserVector,
        );
        return { userId: user.id, similarity };
      }),
    );

    // 3. 按相似度排序，取Top 5相似用户
    const topSimilarUsers = usersSimilarity
      .sort((a, b) => b.similarity - a.similarity)
      // .slice(0, 5);
      .slice(0, 1);

    // 4. 收集相似用户点击的标签
    const similarUserTagNames = await this.db
      .selectDistinct({ tagName: user_tag_clicks.tagName })
      .from(user_tag_clicks)
      .where(
        inArray(
          user_tag_clicks.userId,
          topSimilarUsers.map((u) => u.userId),
        ),
      );

    // 5. 过滤当前用户未点击的标签
    const currentUserClickedTags = await this.db
      .select()
      .from(user_tag_clicks)
      .where(eq(user_tag_clicks.userId, userId));

    const recommendedTagNames = similarUserTagNames
      .map((t) => t.tagName)
      .filter(
        (tagName) => !currentUserClickedTags.some((c) => c.tagName === tagName),
      );

    // 6. 查询推荐商品
    if (recommendedTagNames.length === 0) {
      return this.getFallbackRecommendations();
    }

    const recommendedWorks = await this.db
      .select()
      .from(work)
      .where(
        sql`JSON_OVERLAPS(${work.tags}, CAST(${JSON.stringify(recommendedTagNames)} AS JSON))`,
      )
      .limit(20);

    return recommendedWorks;
  }

  // 降级推荐（返回最近添加的商品）
  private async getFallbackRecommendations() {
    return this.db.select().from(work).orderBy(desc(work.createdAt)).limit(20);
  }
}

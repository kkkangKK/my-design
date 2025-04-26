import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';

import { user_tag_clicks } from '@kkkang/schema';

import { and, eq } from 'drizzle-orm';
import { ClickBtTagsDto, ClickDto } from './dto/click.dto';
import { TagService } from '../tag/tag.service';

@Injectable()
export class ClickService {
  constructor(
    @Inject(DB) private db: DbType,
    private tagService: TagService,
  ) {}

  async addClickCount(dto: ClickDto) {
    const count = await this.getClickCount(dto);
    if (!count) {
      await this.db.insert(user_tag_clicks).values({
        ...dto,
        clickCount: 1,
      });
    } else {
      await this.db
        .update(user_tag_clicks)
        .set({ ...dto, clickCount: count + 1 })
        .where(
          and(
            eq(user_tag_clicks.tagId, dto.tagId),
            eq(user_tag_clicks.userId, dto.userId),
          ),
        );
    }
    return {
      ...dto,
      clickCount: count + 1,
    };
  }

  async addClickCountByTags(dto: ClickBtTagsDto) {
    for (const tagName of dto.tags) {
      const tagId = (await this.tagService.getTagByName(tagName)).id;
      if (!tagId) continue;
      await this.addClickCount({ ...dto, tagId });
    }
  }

  async deleteTagByUserId(userId: string) {
    return this.db
      .delete(user_tag_clicks)
      .where(eq(user_tag_clicks.userId, userId));
  }

  async deleteTagByTagId(tagId: string) {
    return this.db
      .delete(user_tag_clicks)
      .where(eq(user_tag_clicks.tagId, tagId));
  }

  async getClickCount(query: ClickDto) {
    const result = await this.db.query.user_tag_clicks.findFirst({
      where: and(
        eq(user_tag_clicks.tagId, query.tagId),
        eq(user_tag_clicks.userId, query.userId),
      ),
    });
    return result?.clickCount || 0;
  }
}

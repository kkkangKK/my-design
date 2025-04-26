import { Inject, Injectable, Logger } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';

import { tag } from '@kkkang/schema';

import { eq } from 'drizzle-orm';

@Injectable()
export class TagService {
  constructor(@Inject(DB) private db: DbType) {}

  async addTag(dto: CreateTagDto) {
    await this.db.insert(tag).values({
      ...dto,
    });
  }

  async updateTag(dto: UpdateTagDto, tagId: string) {
    await this.db.update(tag).set(dto).where(eq(tag.id, tagId));
    return {
      tagId: tagId,
      ...dto,
    };
  }

  async deleteTag(tagId: string) {
    return this.db.delete(tag).where(eq(tag.id, tagId));
  }

  async getTagById(tagId: string) {
    return await this.db.query.tag.findFirst({
      where: eq(tag.id, tagId),
    });
  }

  async getTagByName(tagName: string) {
    return await this.db.query.tag.findFirst({
      where: eq(tag.name, tagName),
    });
  }
}

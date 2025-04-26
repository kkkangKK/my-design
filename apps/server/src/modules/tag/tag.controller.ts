import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';
import { number } from 'zod';

import { JwtAuthGuard } from '../../guards/jwt.guard';
import { TagService } from './tag.service';

@ApiTags('🚧标签模块')
@ApiBearerAuth()
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '添加标签',
    description: '添加标签',
  })
  @ApiBody({ type: CreateTagDto })
  async addTag(@Body() dto: CreateTagDto) {
    try {
      await this.tagService.addTag({ ...dto });
      return {
        code: 200,
        msg: '执行成功',
      };
    } catch (error) {
      return {
        msg: '执行失败' + error,
      };
    }
  }

  @Delete(':tagId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'tagId',
    description: '标签ID',
    type: number,
    required: true,
  })
  @ApiOperation({
    summary: '删除标签',
    description: '删除标签',
  })
  async delTag(@Param('tagId') tagId: string) {
    try {
      const res = await this.tagService.deleteTag(tagId);
      return {
        code: 200,
        msg: '执行成功',
        data: res,
      };
    } catch (error) {
      return {
        msg: '执行失败' + error,
      };
    }
  }

  @Put(':tagId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '修改标签',
    description: '修改标签',
  })
  @ApiBody({ type: UpdateTagDto })
  async updateTag(@Param('tagId') tagId: string, @Body() dto: UpdateTagDto) {
    try {
      const res = await this.tagService.updateTag(dto, tagId);
      return {
        code: 200,
        msg: '执行成功',
        data: res,
      };
    } catch (error) {
      return '执行失败' + error;
    }
  }

  @Get(':tagId')
  @ApiParam({
    name: 'tagId',
    description: '标签Id',
    type: number,
    required: true,
  })
  @ApiOperation({
    summary: '查找标签',
    description: '查找标签',
  })
  async getTag(@Param('tagId') tagId: string) {
    try {
      const res = await this.tagService.getTagById(tagId);
      return {
        code: 200,
        msg: '执行成功',
        data: res,
      };
    } catch (error) {
      return '执行失败' + error;
    }
  }
}

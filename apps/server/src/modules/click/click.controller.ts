import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ClickDto, ClickBtTagsDto } from './dto/click.dto';
import { number } from 'zod';

import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ClickService } from './click.service';

@ApiTags('🚧用户点击标签模块')
@ApiBearerAuth()
@Controller('click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Post('tagId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '添加用户点击标签',
    description: '添加用户点击标签',
  })
  @ApiBody({ type: ClickDto })
  async addClick(@Body() dto: ClickDto) {
    try {
      const data = await this.clickService.addClickCount({ ...dto });
      return {
        code: 200,
        msg: '执行成功',
        data,
      };
    } catch (error) {
      return {
        msg: '执行失败' + error,
      };
    }
  }

  @Post('tagName')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '添加用户点击标签',
    description: '添加用户点击标签',
  })
  @ApiBody({ type: ClickBtTagsDto })
  async addClickByTags(@Body() dto: ClickBtTagsDto) {
    try {
      const data = await this.clickService.addClickCountByTags(dto);
      return {
        code: 200,
        msg: '执行成功',
        data,
      };
    } catch (error) {
      return {
        msg: '执行失败' + error,
      };
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '查找用户点击标签',
    description: '查找用户点击标签',
  })
  async getClickCount(@Query() query: ClickDto) {
    try {
      const res = await this.clickService.getClickCount(query);
      return {
        code: 200,
        msg: '执行成功',
        data: res,
      };
    } catch (error) {
      return '执行失败' + error;
    }
  }

  @Delete('tag/:tagId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'tagId',
    description: '标签ID',
    type: number,
    required: true,
  })
  @ApiOperation({
    summary: '通过tagID删除用户点击标签',
    description: '通过tagID删除用户点击标签',
  })
  async delClickByTag(@Param('tagId') tagId: string) {
    try {
      const res = await this.clickService.deleteTagByTagId(tagId);
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

  @Delete('user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'userId',
    description: '用户ID',
    type: number,
    required: true,
  })
  @ApiOperation({
    summary: '通过userId删除用户点击标签',
    description: '通过userId删除用户点击标签',
  })
  async delClickByUser(@Param('userId') userId: string) {
    try {
      const res = await this.clickService.deleteTagByUserId(userId);
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
}

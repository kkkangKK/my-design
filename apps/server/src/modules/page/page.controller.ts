import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PageService } from './page.service';
import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { string } from 'zod';

@ApiBearerAuth()
@ApiTags('🔮H5渲染模块')
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get(':pageId')
  @ApiParam({
    name: 'pageId',
    description: '渲染页面ID',
    required: true,
    type: string,
  })
  @ApiOperation({
    summary: '获取渲染H5',
    description: '获取渲染H5',
  })
  @Render('index')
  async renderH5Page(@Param('pageId') pageId: string, @Res() res) {
    try {
      const data = await this.pageService.renderToPageData(pageId);
      res.view('index.art', data);
      return {
        code: 200,
        data: '页面渲染成功',
      };
    } catch (error) {
      return {
        msg: '获取H5页面失败：' + error,
      };
    }
  }

  @Get('preview/:pageId')
  @ApiParam({
    name: 'pageId',
    description: '渲染页面ID',
    required: true,
    type: string,
  })
  @ApiOperation({
    summary: '获取渲染H5',
    description: '获取渲染H5',
  })
  @Render('index')
  async renderH5PagePreview(@Param('pageId') pageId: string, @Res() res) {
    try {
      const data = await this.pageService.renderToPageData(pageId);
      res.view('index.art', data);
      return {
        code: 200,
        data: '页面渲染成功',
      };
    } catch (error) {
      return {
        msg: '获取H5页面失败：' + error,
      };
    }
  }
}

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RecommendationService } from './recommendation.service';
import { Controller, Get, Param, Render, Res, UseGuards } from '@nestjs/common';
import { string } from 'zod';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@ApiBearerAuth()
@ApiTags('🔮推荐算法模块')
@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'userId',
    description: '用户ID',
    required: true,
    type: string,
  })
  @ApiOperation({
    summary: '推荐算法',
    description: '推荐算法',
  })
  async getRecommendations(@Param('userId') userId: string) {
    try {
      const data = await this.recommendationService.getRecommendations(userId);
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
}

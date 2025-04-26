import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { UserModule } from '../user/user.module';
import { TagModule } from '../tag/tag.module';
import { ClickModule } from '../click/click.module';

@Module({
  imports: [UserModule, TagModule, ClickModule],
  controllers: [RecommendationController],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationModule {}

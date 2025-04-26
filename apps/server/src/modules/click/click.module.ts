import { Module } from '@nestjs/common';
import { ClickController } from './click.controller';
import { ClickService } from './click.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TagModule],
  controllers: [ClickController],
  providers: [ClickService],
  exports: [ClickService],
})
export class ClickModule {}

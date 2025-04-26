import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ClickDto {
  @ApiProperty({
    example: 13,
    description: '用户ID不能为空',
  })
  @IsString({ message: '用户id必须是字符串类型' })
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: string;

  @ApiProperty({
    example: 13,
    description: '标签ID不能为空',
  })
  @IsString({ message: '标签id必须是字符串类型' })
  @IsNotEmpty({ message: '标签ID不能为空' })
  tagId: string;
}

export class ClickBtTagsDto extends OmitType(ClickDto, ['tagId']) {
  @ApiProperty({
    example: ['青春', '校园'],
    description: '标签不能为空',
  })
  @IsArray({ message: '标签不能为空' })
  @IsNotEmpty({ message: '标签名不能为空' })
  tags: string[];
}

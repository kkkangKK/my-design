import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    example: '青春',
    description: '标签名不能为空,长度为1-20位',
  })
  @IsNotEmpty({ message: '标签名不能为空' })
  @Length(1, 20, { message: '标签长度为1-20位' })
  name: string;

  @ApiProperty({
    example: '青春是最美好的',
    required: false,
    description: '解释（可选）',
  })
  @IsOptional()
  @IsString({ message: '解释必须是字符串类型' })
  description?: string;
}

export class UpdateTagDto extends OmitType(CreateTagDto, ['name']) {
  @ApiProperty({
    example: '青春',
    required: false,
    description: '标签名不能为空,长度为1-20位',
  })
  @IsNotEmpty({ message: '标签名不能为空' })
  @Length(1, 20, { message: '标签长度为1-20位' })
  name: string;
}

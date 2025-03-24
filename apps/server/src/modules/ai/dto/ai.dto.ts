import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// 严格限定为实际使用的角色类型
export enum ChatRole {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
}

class ChatMessageDto {
  @ApiProperty({
    enum: ChatRole,
    example: ChatRole.User,
  })
  @IsEnum(ChatRole)
  role: ChatRole;

  @ApiProperty({ example: '如何计算圆周率？' })
  content: string;

  // 若需要 function 角色可添加可选参数
  @ApiProperty({ required: false })
  name?: string; // 仅当 role=function 时需要
}

export class ChatRequestDto {
  @ApiProperty({ description: '消息历史', type: [ChatMessageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages: ChatMessageDto[];

  @ApiProperty({ description: '启用深度推理模式', default: false })
  @IsBoolean()
  deepMode: boolean;
}

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';
import { ChatRequestDto } from './dto/ai.dto';

@ApiBearerAuth()
@ApiTags('🤖 AI聊天')
@Controller('ai')
export class AiController {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('DEEPSEEK_API_KEY'),
      baseURL: 'https://api.deepseek.com/v1',
    });
  }

  @Post('chat')
  @ApiOperation({ summary: '普通对话接口' })
  @ApiBody({ type: ChatRequestDto })
  @ApiResponse({
    status: 200,
    description: '返回完整响应',
    schema: {
      example: {
        content: '这里是AI的完整回复',
      },
    },
  })
  async chat(@Body() body: ChatRequestDto) {
    const { messages, deepMode } = body;

    try {
      const completion = await this.openai.chat.completions.create({
        model: deepMode ? 'deepseek-reasoner' : 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `当前模式：${
              deepMode
                ? '深度推理（DeepSeek-Reasoner）'
                : '标准对话（DeepSeek-Chat）'
            }`,
          },
          ...messages,
        ],
        temperature: deepMode ? 0.7 : 0.3,
      });

      return {
        code: 200,
        msg: '服务调用成功',
        data: {
          content: completion.choices[0].message.content,
        },
      };
    } catch (error) {
      return {
        msg: '服务暂不可用 | ' + error,
      };
    }
  }
}

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CallbackUserData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user.userId) {
      request.user.userId = request.user.id;
    }
    return request.user;
  },
);

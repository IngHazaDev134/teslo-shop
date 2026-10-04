import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if(!req.user) throw new InternalServerErrorException('User not found in request');
    return (!data) ? req.user : req.user[data];
  }
);
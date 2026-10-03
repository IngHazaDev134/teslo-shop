import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";


export const GetUSer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if(!req.user) throw new InternalServerErrorException('User not found in request');
    return req.user;
  }
);
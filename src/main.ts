import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UseGlobalPipesConfig } from './config/useGlobalPipes.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({...UseGlobalPipesConfig}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

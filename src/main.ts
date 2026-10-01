import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { UseGlobalPipesConfig } from './config/useGlobalPipes.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({...UseGlobalPipesConfig}));
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`App running on port ${process.env.PORT}`)
}
bootstrap();

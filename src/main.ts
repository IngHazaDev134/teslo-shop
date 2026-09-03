import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   //! Prefico para las rutas del API
  app.setGlobalPrefix('api');
   //! Validaciones de nuestros DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true, 
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

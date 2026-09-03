import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormModuleConfig } from './config/ormModule.config';

@Module({
  imports: [
     //! Configuracion de las variables de entorno
    ConfigModule.forRoot(),
    //! Configuracion del ORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'nestjs',
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      autoLoadEntities: true,
      synchronize: true,
     })

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

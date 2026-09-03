interface OrmModuleConfig {
    type: string;
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    autoLoadEntities: boolean;
    synchronize: boolean;
}

export const ormModuleConfig: OrmModuleConfig = ({
    type: process.env.DB_MOTOR_DB || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'nestjs',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    autoLoadEntities: true,
    synchronize: true,
});
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isDev = configService.get('NODE_ENV', 'DEV');

        return {
          type: configService.get<string>('DB_DIALECT', 'postgres') as any,
          host: configService.get('POSTGRES_HOST', 'localhost'),
          port: +configService.get<number>('POSTGRES_PORT', 4321),
          username: configService.get('POSTGRES_USER', 'nagge'),
          password: configService.get('POSTGRES_PASSWORD', '246579'),
          database: configService.get<string>('POSTGRES_DATABASE', 'nagge'),
          entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
          migrationsRun: true,
          cli: {
            migrationsDir: `./${isDev ? 'src' : 'dist'}/migration`,
          },
          synchronize: false,
          keepConnectionAlive: isDev,
          logging: !!configService.get<boolean>('DB_DEBUG'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DbModule {}

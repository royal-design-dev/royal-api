import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BindsModule } from 'src/binds/binds.module';
import { ServicesModule } from 'src/services/services.module';
import { TypesModule } from 'src/types/types.module';
import { UsersModule } from 'src/users/users.module';
import { ShotsController } from './shots.controller';
import { ShotsRepository } from './shots.repository';
import { ShotsService } from './shots.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShotsRepository]),
    BindsModule,
    TypesModule,
    ServicesModule,
    UsersModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ShotsController],
  providers: [ShotsService],
  exports: [ShotsService],
})
export class ShotsModule {}

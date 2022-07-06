import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from 'src/services/services.module';
import { BindsController } from './binds.controller';
import { BindsRepository } from './binds.repository';
import { BindsService } from './binds.service';
import { DribbbleService } from './dribbble.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BindsRepository]),
    ServicesModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BindsController],
  providers: [BindsService, DribbbleService],
  exports: [BindsService, DribbbleService],
})
export class BindsModule {}

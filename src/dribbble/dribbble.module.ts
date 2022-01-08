import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DribbbleController } from './dribbble.controller';
import { DribbbleService } from './dribbble.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('DRIBBBLE_API'),
        timeout: 5000,
        maxRedirects: 5,
        headers: {
          Authorization: `Bearer ${configService.get('DRIBBBLE_TOKEN')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [DribbbleController],
  providers: [DribbbleService],
  exports: [DribbbleService],
})
export class DribbbleModule {}

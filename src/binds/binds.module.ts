import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BindsController } from './binds.controller';
import { BindsRepository } from './binds.repository';
import { BindsService } from './binds.service';

@Module({
  imports: [TypeOrmModule.forFeature([BindsRepository])],
  controllers: [BindsController],
  providers: [BindsService],
  exports: [BindsService],
})
export class BindsModule {}

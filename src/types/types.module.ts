import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesController } from './types.controller';
import { TypesRepository } from './types.repository';
import { TypesService } from './types.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypesRepository])],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}

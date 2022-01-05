import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShotsController } from './shots.controller';
import { ShotsRepository } from './shots.repository';
import { ShotsService } from './shots.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShotsRepository])],
  controllers: [ShotsController],
  providers: [ShotsService],
  exports: [ShotsService],
})
export class ShotsModule {}

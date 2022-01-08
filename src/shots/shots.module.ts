import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadsModule } from 'src/uploads/uploads.module';
import { ShotsController } from './shots.controller';
import { ShotsRepository } from './shots.repository';
import { ShotsService } from './shots.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShotsRepository]), UploadsModule],
  controllers: [ShotsController],
  providers: [ShotsService],
  exports: [ShotsService],
})
export class ShotsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BindsModule } from 'src/binds/binds.module';
import { ShotsController } from './shots.controller';
import { ShotsRepository } from './shots.repository';
import { ShotsService } from './shots.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShotsRepository]), BindsModule],
  controllers: [ShotsController],
  providers: [ShotsService],
  exports: [ShotsService],
})
export class ShotsModule {}

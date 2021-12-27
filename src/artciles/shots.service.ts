import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShotsRepository } from './shots.repository';
import { ShotsCreateDto } from './types/dto/shots-create.dto';

@Injectable()
export class ShotsService {
  constructor(
    @InjectRepository(ShotsRepository)
    private readonly shotsRepository: ShotsRepository,
  ) {}

  async findAndCount() {
    return this.shotsRepository.findAllAndCount();
  }

  async create(shot: ShotsCreateDto) {
    const item = this.shotsRepository.create(shot);

    return await this.shotsRepository.save(item);
  }
}

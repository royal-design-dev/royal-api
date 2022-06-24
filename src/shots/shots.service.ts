import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShotsRepository } from './shots.repository';
import { ShotsCreateDto } from './types/dto/shots-create.dto';
import { ShotsUpdateDto } from './types/dto/shots-update.dto';
import { ShotsFilterDto } from './types/dto/shots.dto';

@Injectable()
export class ShotsService {
  constructor(
    @InjectRepository(ShotsRepository)
    private readonly shotsRepository: ShotsRepository,
  ) {}

  async findAndCount(filter: ShotsFilterDto) {
    return this.shotsRepository.findAllAndCount(filter);
  }

  async findById(id: string) {
    return this.shotsRepository.findOneById(id);
  }

  async create(shot: ShotsCreateDto) {
    const item = await this.shotsRepository.create(shot);

    return await this.shotsRepository.save(item);
  }

  async remove(id: string) {
    const rows = await this.shotsRepository.delete({ id });

    if (rows.affected === 0)
      throw new NotFoundException(`Shot with id ${id} not found`);
  }

  async change(id: string, updateShotDto: ShotsUpdateDto) {
    try {
      await this.shotsRepository.save({ id, ...updateShotDto });

      return await this.findById(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}

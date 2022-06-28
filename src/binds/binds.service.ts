import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BindsRepository } from './binds.repository';
import { BindsCreateDto } from './types/dto/binds-create.dto';

@Injectable()
export class BindsService {
  constructor(
    @InjectRepository(BindsRepository)
    private readonly bindsRepository: BindsRepository,
  ) {}

  async preBindDribbble(userId) {
    return await this.bindsRepository.findOne({ user: { id: userId } });
  }

  async create(service: BindsCreateDto) {
    const item = this.bindsRepository.create(service);

    return await this.bindsRepository.save(item);
  }

  async findAll() {
    return await this.bindsRepository.find();
  }
}

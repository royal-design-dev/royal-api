import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesRepository } from './services.repository';
import { ServicesCreateDto } from './types/dto/services-create.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesRepository)
    private readonly servicesRepository: ServicesRepository,
  ) {}

  async create(service: ServicesCreateDto) {
    const item = this.servicesRepository.create(service);

    return await this.servicesRepository.save(item);
  }

  async findAll() {
    return await this.servicesRepository.find();
  }
}

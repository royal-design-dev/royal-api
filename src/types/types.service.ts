import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypesRepository } from './types.repository';
import { TypesCreateDto } from './types/dto/types-create.dto';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(TypesRepository)
    private readonly typesRepository: TypesRepository,
  ) {}

  async create(service: TypesCreateDto) {
    const item = this.typesRepository.create(service);

    return await this.typesRepository.save(item);
  }

  async findAll() {
    return await this.typesRepository.find();
  }
}

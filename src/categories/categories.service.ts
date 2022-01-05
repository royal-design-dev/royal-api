import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { CategoriesCreateDto } from './types/dto/categories-create.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async create(category: CategoriesCreateDto) {
    const item = this.categoriesRepository.create(category);

    return await this.categoriesRepository.save(item);
  }
}

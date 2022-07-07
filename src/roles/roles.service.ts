import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesRepository } from './roles.repository';
import { RolesCreateDto } from './types/dto/roles-create.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository)
    private readonly rolesRepository: RolesRepository,
  ) {}

  create = async (role: RolesCreateDto) => {
    const item = await this.rolesRepository.create(role);

    return await this.rolesRepository.save(item);
  };

  getByValue = async (value: string) =>
    await this.rolesRepository.findOne({ value });
}

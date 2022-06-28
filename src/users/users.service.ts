import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/auth/types/dto/login-user.dto';
import { UsersEntity } from 'src/users/entity/users.entity';
import { UsersCreateDto } from './types/dto/users-create.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(user: UsersCreateDto) {
    const item = await this.usersRepository.create(user);

    return await this.usersRepository.save(item);
  }

  async login(userDto: LoginUserDto): Promise<UsersEntity> {
    return await this.findOneByLogin(userDto.login);
  }

  async findOneById(id: string) {
    return await this.usersRepository.findOneOrFail({ id });
  }

  async findOneByLogin(login: string) {
    return await this.usersRepository.findOneOrFail({ login });
  }

  async findAllInfo(userId: string) {
    return await this.usersRepository.findAllInfo(userId);
  }
}

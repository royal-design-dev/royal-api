import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/auth/types/dto/login-user.dto';
import { UsersEntity } from 'src/users/entity/users.entity';
import { UsersCreateDto } from './types/dto/users-create.dto';
import { UsersUpdateDto } from './types/dto/users-update.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(user: UsersCreateDto) {
    const findUser = await this.usersRepository.findOne({
      where: { login: user.login },
    });

    if (findUser)
      throw new ConflictException('A user with this login already exists');

    const item = await this.usersRepository.create(user);

    const createUser = await this.usersRepository.save(item);

    const tokens = await this.authService.login(user);
    const newUser = await this.usersRepository.findAllInfo(createUser.id);

    return { ...newUser, tokens };
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

  async change(id: string, user: UsersUpdateDto) {
    try {
      const userItem = await this.findOneById(id);

      await this.usersRepository.save(
        new UsersEntity({
          ...userItem,
          ...user,
        }),
      );

      return await this.findAllInfo(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}

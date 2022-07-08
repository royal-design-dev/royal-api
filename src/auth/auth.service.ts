import { Injectable } from '@nestjs/common';
import { UsersCreateDto } from 'src/users/types/dto/users-create.dto';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt-payload';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(userDto: UsersCreateDto) {
    const user = await this.usersService.login(userDto);

    if (!user) return null;

    if (!(await user.comparePassword(userDto.password))) return null;

    const accessToken = await this.tokenService.createAccessToken({
      sub: String(user.id),
      login: user.login,
    });

    await this.tokenService.deleteRefreshTokens(accessToken);

    const refreshToken = await this.tokenService.createRefreshToken({
      userId: String(user.id),
    });

    return { accessToken, refreshToken };
  }

  async validateUser({ sub, login }: JwtPayload): Promise<any> {
    const user = await this.usersService.findOneById(sub);

    if (!user) return null;

    return {
      userId: sub,
      login,
      role: user.role,
    };
  }
}

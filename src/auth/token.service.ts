import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { LoginRo } from './types/ro/login.ro';

import { JwtPayload } from './jwt-payload';
import { UsersService } from 'src/users/users.service';
import { RefreshToken } from './entity/refreshtoken.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async getAccessTokenFromRefreshToken(
    oldRefreshToken: string,
  ): Promise<LoginRo> {
    try {
      const token = await this.refreshTokenRepository.findOne({
        token: oldRefreshToken,
      });

      await this.refreshTokenRepository.delete({ userId: token.userId });

      if (!token) {
        throw new NotFoundException('Refresh token not found');
      }

      if (new Date(token.expiresIn) < new Date()) {
        throw new UnauthorizedException('Refresh token expired');
      }

      const user = await this.usersService.findOneById(token.userId);

      if (!user) {
        throw new NotFoundException('UsersEntity not found');
      }

      const accessToken = await this.createAccessToken({
        sub: token.userId,
        login: user.login,
      });

      const refreshToken = await this.createRefreshToken({
        userId: token.userId,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async createAccessToken(payload: JwtPayload): Promise<string> {
    const signedPayload = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('EXPIRES_IN'),
      secret: this.configService.get('SECRET_KEY'),
    });

    return signedPayload;
  }

  async createRefreshToken({ userId }: { userId: string }): Promise<string> {
    const token = nanoid(64).toString();
    const refreshExpiresIn = this.configService.get('REFRESH_EXPIRES_IN');
    const refreshToken = this.refreshTokenRepository.create({
      userId,
      token,
      expiresIn: dayjs().add(
        +refreshExpiresIn.match(/\d+/g)[0],
        refreshExpiresIn.match(/[a-zA-Z]+/g)[0],
      ),
    });

    await this.refreshTokenRepository.save(refreshToken);

    return token;
  }

  async deleteRefreshToken(refreshToken: string) {
    await this.refreshTokenRepository.delete({ token: refreshToken });
  }

  async deleteRefreshTokens(accessToken: string) {
    const { sub } = await this.validateToken(accessToken, true);

    await this.refreshTokenRepository.delete({ userId: sub });
  }

  private async validateToken(
    token: string,
    ignoreExpiration = false,
  ): Promise<JwtPayload> {
    return this.jwtService.verify(token, {
      secret: this.configService.get('SECRET_KEY'),
      ignoreExpiration,
    });
  }
}

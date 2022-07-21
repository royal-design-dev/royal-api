import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import getCookieAuth from 'src/common/scripts/getCookieAuth';
import { AuthService } from './auth.service';
import Auth from './guards/auth.guard';
import { Roles } from './roles/role.decorator';
import { Role } from './roles/role.enum';
import { TokenService } from './token.service';
import { LoginUserDto } from './types/dto/login-user.dto';
import { RefreshTokensDto } from './types/dto/refresh-tokens.dto';
import { LoginRo } from './types/ro/login.ro';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Logs user into the system',
  })
  @ApiBody({
    description: 'UsersEntity credentials',
    type: LoginUserDto,
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: LoginRo,
  })
  @ApiUnauthorizedResponse({
    description: 'Something is wrong. Check you login or password.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  public async login(@Body(new ValidationPipe()) userDto: LoginUserDto) {
    const loginResults = await this.authService.login(userDto);

    if (!loginResults)
      throw new UnauthorizedException(
        'Something is wrong. Check you login or password.',
      );

    return loginResults;
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh user tokens',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: LoginRo,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  public async refreshTokens(
    @Body(new ValidationPipe()) refreshTokens: RefreshTokensDto,
  ): Promise<LoginRo> {
    return this.tokenService.getAccessTokenFromRefreshToken(
      refreshTokens.refresh_token,
    );
  }

  @Post('check-tokens')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Check user tokens',
  })
  @ApiOkResponse({
    description: 'Successful operation',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  public checkingTokens(): boolean {
    return true;
  }

  @Post('cookies')
  @Roles(Role.Admin)
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get cookies tokens',
  })
  @ApiOkResponse({
    description: 'Successful operation',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  public async getCookies(): Promise<boolean> {
    return await getCookieAuth();
  }
}

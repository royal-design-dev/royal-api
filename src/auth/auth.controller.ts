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
import { AuthService } from './auth.service';
import { LoginUserDto } from './types/dto/login-user.dto';
import { LoginRo } from './types/ro/login.ro';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
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
    description: 'Authentication failed due to incorrect username or password.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  public async login(@Body(new ValidationPipe()) userDto: LoginUserDto) {
    const loginResults = await this.authService.login(userDto);

    if (!loginResults)
      throw new UnauthorizedException(
        'Authentication failed due to incorrect username or password.',
      );

    return loginResults;
  }
}

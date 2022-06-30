import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import Auth from 'src/auth/guards/auth.guard';
import { UsersCreateDto } from './types/dto/users-create.dto';
import { UsersCreateRo } from './types/ro/users-create.ro';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiBody({
    description: 'Users object that needs to be added',
    type: UsersCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: UsersCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  create(@Body(new ValidationPipe()) userDto: UsersCreateDto) {
    return this.usersService.create(userDto);
  }

  @Post('info')
  @Auth()
  @ApiOperation({
    summary: 'Get user info',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  public async get(@Req() req: Request) {
    const { userId } = req.user as { userId: string };

    return await this.usersService.findAllInfo(userId);
  }
}

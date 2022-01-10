import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
  create(@Body() userDto: UsersCreateDto) {
    return this.usersService.create(userDto);
  }
}

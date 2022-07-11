import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import Auth from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/roles/role.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { UsersCreateDto } from './types/dto/users-create.dto';
import { UsersUpdateDto } from './types/dto/users-update.dto';
import { UsersCreateRo } from './types/ro/users-create.ro';
import { UsersUpdateRo } from './types/ro/users-update.ro';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
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
  create(@Body(new ValidationPipe()) userDto: UsersCreateDto) {
    return this.usersService.create(userDto);
  }

  @Post('info')
  @Auth()
  @ApiOperation({
    summary: 'Get user info',
  })
  @HttpCode(HttpStatus.CREATED)
  public async get(@Req() req: Request) {
    const { userId } = req.user as { userId: string };

    return await this.usersService.findAllInfo(userId);
  }

  @Patch('info/:id')
  @Roles(Role.Admin)
  @Auth()
  @ApiParam({
    description: 'Id of user to change(Only Admin)',
    name: 'id',
  })
  @ApiBody({
    required: false,
    description: 'Service object that needs to be update',
    type: UsersUpdateDto,
  })
  @ApiOperation({
    summary: 'Change user info',
  })
  @ApiOkResponse({ description: 'Successful operation', type: UsersUpdateRo })
  @HttpCode(HttpStatus.CREATED)
  public async change(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UsersUpdateDto,
  ) {
    return await this.usersService.change(id, user);
  }
}

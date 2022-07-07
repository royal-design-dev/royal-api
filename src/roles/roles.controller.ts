import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import Auth from 'src/auth/guards/auth.guard';
import { RolesService } from './roles.service';
import { RolesCreateDto } from './types/dto/roles-create.dto';
import { RolesCreateRo } from './types/ro/roles-create.ro';

@ApiTags('roles')
@Controller('roles')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    description: 'RolesEntity credentials',
    type: RolesCreateDto,
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: RolesCreateRo,
  })
  public async create(@Body(new ValidationPipe()) role: RolesCreateDto) {
    return await this.rolesService.create(role);
  }
}

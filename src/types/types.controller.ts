import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import Auth from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/roles/role.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { TypesService } from './types.service';
import { TypesCreateDto } from './types/dto/types-create.dto';
import { TypesCreateRo } from './types/ro/types-create.ro';
import { TypesRo } from './types/ro/types.ro';

@ApiTags('types')
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  @Roles(Role.Admin)
  @Auth()
  @ApiOperation({
    summary: 'Create type',
  })
  @ApiBody({
    description: 'Type object that needs to be added',
    type: TypesCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: TypesCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body(new ValidationPipe()) service: TypesCreateDto) {
    return await this.typesService.create(service);
  }

  @Get()
  @ApiOperation({
    summary: 'Return list of types',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: TypesRo,
  })
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getAllAndCount() {
    return await this.typesService.findAll();
  }
}

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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import Auth from 'src/auth/guards/auth.guard';
import { BindsService } from './binds.service';
import { BindsCreateDto } from './types/dto/binds-create.dto';
import { BindsCreateRo } from './types/ro/binds-create.ro';
import { BindsRo } from './types/ro/binds.ro';

@ApiTags('binds')
@Controller('binds')
export class BindsController {
  constructor(private readonly bindsService: BindsService) {}

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Create bind',
  })
  @ApiBody({
    description: 'Service object that needs to be added',
    type: BindsCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: BindsCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body() service: BindsCreateDto) {
    return await this.bindsService.create(service);
  }

  @Get()
  @Auth()
  @ApiOperation({
    summary: 'Return list of binds',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: BindsRo,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getAllAndCount() {
    return await this.bindsService.findAll();
  }
}

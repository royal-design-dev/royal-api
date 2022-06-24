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
import { ServicesService } from './services.service';
import { ServicesCreateDto } from './types/dto/services-create.dto';
import { ServicesCreateRo } from './types/ro/services-create.ro';
import { ServicesRo } from './types/ro/services.ro';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Create service',
  })
  @ApiBody({
    description: 'Service object that needs to be added',
    type: ServicesCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: ServicesCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body() service: ServicesCreateDto) {
    return await this.servicesService.create(service);
  }

  @Get()
  @ApiOperation({
    summary: 'Return list of services',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: ServicesRo,
  })
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getAllAndCount() {
    return await this.servicesService.findAll();
  }
}

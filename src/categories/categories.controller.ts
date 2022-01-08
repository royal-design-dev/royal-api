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
import { CategoriesService } from './categories.service';
import { CategoriesCreateDto } from './types/dto/categories-create.dto';
import { CategoriesCreateRo } from './types/ro/categories-create.ro';
import { CategoriesRo } from './types/ro/categories.ro';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create category',
  })
  @ApiBody({
    description: 'Category object that needs to be added',
    type: CategoriesCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: CategoriesCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body() category: CategoriesCreateDto) {
    return await this.categoriesService.create(category);
  }

  @Get()
  @ApiOperation({
    summary: 'Return list of categories',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: CategoriesRo,
  })
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getAllAndCount() {
    return await this.categoriesService.findAll();
  }
}

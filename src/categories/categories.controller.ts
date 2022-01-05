import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoriesCreateDto } from './types/dto/categories-create.dto';
import { CategoriesCreateRo } from './types/ro/categories-create.ro';

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
    return this.categoriesService.create(category);
  }
}

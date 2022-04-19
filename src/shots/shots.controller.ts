import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
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
import Auth from 'src/auth/guards/auth.guard';
import { ShotsService } from './shots.service';
import { ShotsCreateDto } from './types/dto/shots-create.dto';
import { ShotsUpdateDto } from './types/dto/shots-update.dto';
import { ShotsFilterDto } from './types/dto/shots.dto';
import { ShotsCreateRo } from './types/ro/shots-create.ro';
import { ShotsListAndCountRo, ShotsRo } from './types/ro/shots.ro';

@ApiTags('shots')
@Controller('shots')
export class ShotsController {
  constructor(private readonly shotsService: ShotsService) {}

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Create shot',
  })
  @ApiBody({
    description: 'Shots object that needs to be added',
    type: ShotsCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: ShotsCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body() shotDto: ShotsCreateDto) {
    return await this.shotsService.create(shotDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Return list of shots with count',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: ShotsListAndCountRo,
  })
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getAllAndCount(
    @Query() filter: ShotsFilterDto,
  ): Promise<ShotsListAndCountRo> {
    const [data, count] = await this.shotsService.findAndCount(filter);

    return { data, count };
  }

  @Get('/filter')
  @ApiOperation({
    summary: 'Return list of shots with filter',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: ShotsRo,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getAllWithFilter(@Query() filter: ShotsFilterDto): Promise<ShotsRo[]> {
    const [data] = await this.shotsService.findAndCount(filter);

    return data;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Shot by id',
  })
  @ApiParam({
    description: 'id of shot to get',
    name: 'id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: ShotsRo,
  })
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.shotsService.findById(id);
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({
    summary: 'Delete a shot',
  })
  @ApiParam({
    description: 'id of shot to delete',
    name: 'id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.shotsService.remove(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Change Shot by id',
  })
  @ApiParam({
    description: 'Id of shot to change',
    name: 'id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: ShotsRo,
  })
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async change(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateShotDto: ShotsUpdateDto,
  ) {
    return await this.shotsService.change(id, updateShotDto);
  }
}

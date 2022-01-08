import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UploadsService } from 'src/uploads/uploads.service';
import { ShotsService } from './shots.service';
import { ShotsCreateDto } from './types/dto/shots-create.dto';
import { ShotsFilterDto } from './types/dto/shots.dto';
import { ShotsCreateRo } from './types/ro/shots-create.ro';
import { ShotsListAndCountRo } from './types/ro/shots.ro';

@ApiTags('shots')
@Controller('shots')
export class ShotsController {
  constructor(
    private readonly shotsService: ShotsService,
    private readonly uploadsService: UploadsService,
  ) {}

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

  @Post()
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
  create(@Body() shotDto: ShotsCreateDto) {
    return this.shotsService.create(shotDto);
  }
}

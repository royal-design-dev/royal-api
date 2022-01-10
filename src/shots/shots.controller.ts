import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
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
import { ShotsFilterDto } from './types/dto/shots.dto';
import { ShotsCreateRo } from './types/ro/shots-create.ro';
import { ShotsListAndCountRo } from './types/ro/shots.ro';

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
}

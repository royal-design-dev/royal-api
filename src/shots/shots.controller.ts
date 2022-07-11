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
  Req,
  UseGuards,
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
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/role.decorator';
import { Role } from 'src/auth/roles/role.enum';
import getCookieAuth from 'src/common/scripts/getCookieAuth';
import { ShotsService } from './shots.service';
import { ShotsCreateDto } from './types/dto/shots-create.dto';
import { ShotsFilterDto } from './types/dto/shots.dto';
import { ShotsCreateRo } from './types/ro/shots-create.ro';
import { ShotsListAndCountRo, ShotsRo } from './types/ro/shots.ro';

@ApiTags('shots')
@Controller('shots')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
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
  async create(
    @Body(new ValidationPipe()) shotDto: ShotsCreateDto,
    @Req() req: Request,
  ) {
    const { userId } = req.user as { userId: string };

    return await this.shotsService.create({ ...shotDto, user: { id: userId } });
  }

  @Get()
  @Auth()
  @ApiOperation({
    summary: 'Return list of shots with count',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: ShotsListAndCountRo,
  })
  @HttpCode(HttpStatus.OK)
  async getAllAndCount(
    @Query() filter: ShotsFilterDto,
  ): Promise<ShotsListAndCountRo> {
    const [data, count] = await this.shotsService.findAndCount(filter);

    return { data, count };
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

  @Post('perform/:id')
  @Auth()
  @ApiParam({
    description: 'id of shot to perform',
    name: 'id',
  })
  @ApiOperation({
    summary: 'Perform shot',
  })
  // @ApiCreatedResponse({
  //   description: 'Successful operation',
  //   type: ShotsCreateRo,
  // })
  @HttpCode(HttpStatus.CREATED)
  async perform(
    @Param('id', ParseUUIDPipe) shotId: string,
    @Req() req: Request,
  ) {
    const { userId } = req.user as { userId: string };

    console.log(userId, shotId);

    return await this.shotsService.perform(userId, shotId);
  }

  // @Patch(':id')
  // @ApiOperation({
  //   summary: 'Change Shot by id',
  // })
  // @ApiParam({
  //   description: 'Id of shot to change',
  //   name: 'id',
  // })
  // @ApiOkResponse({
  //   description: 'Successful operation',
  //   type: ShotsRo,
  // })
  // @HttpCode(HttpStatus.OK)
  // @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  // async change(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body(new ValidationPipe({ transform: true }))
  //   updateShotDto: ShotsUpdateDto,
  // ) {
  //   return await this.shotsService.change(id, updateShotDto);
  // }
}

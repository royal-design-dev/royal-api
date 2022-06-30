import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
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
import { Request } from 'express';
import Auth from 'src/auth/guards/auth.guard';
import { BindsService } from './binds.service';
import { BindsServiceCreateDto } from './types/dto/binds-service-create.dto';
import { BindsCreateRo } from './types/ro/binds-create.ro';
import { BindsListRo } from './types/ro/binds-list.ro';

@ApiTags('binds')
@Controller('binds')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class BindsController {
  constructor(private readonly bindsService: BindsService) {}

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Get token and create bind by service',
  })
  @ApiBody({
    description: 'Service object that needs to be added',
    type: BindsServiceCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: BindsCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) body: BindsServiceCreateDto,
    @Req() req: Request,
  ) {
    const { userId } = req.user as { userId: string };

    return await this.bindsService.getTokenAndCreateBind(body, userId);
  }

  @Get()
  @Auth()
  @ApiOperation({
    summary: 'Return list of binds',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: BindsListRo,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  async getAllAndCount(@Req() req: Request) {
    const { userId } = req.user as { userId: string };

    return await this.bindsService.findAllByUser(userId);
  }

  @Get('service/:serviceSlug')
  @Auth()
  @ApiOperation({
    summary: 'Get Auth link',
  })
  @HttpCode(HttpStatus.OK)
  async getBindLink(
    @Param('serviceSlug') serviceSlug: string,
    @Req() req: Request,
  ) {
    const { userId } = req.user as { userId: string };

    return await this.bindsService.findAuthLink(userId, serviceSlug);
  }
}

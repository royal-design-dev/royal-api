import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DribbbleService } from './dribbble.service';
import { DribbbleRo } from './types/ro/dribbble.ro';

@ApiTags('dribbble')
@Controller('dribbble')
export class DribbbleController {
  constructor(private readonly dribbbleService: DribbbleService) {}

  @Get()
  @ApiOperation({
    summary: 'Return list of shots from dribbble account',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: DribbbleRo,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async get(): Promise<DribbbleRo[]> {
    return await this.dribbbleService.findAll();
  }
}

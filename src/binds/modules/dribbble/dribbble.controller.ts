import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { stringify } from 'qs';

import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { DribbbleUserDto } from './types/dto/dribbble-user.dto';
import { DribbbleUserRo } from './types/ro/dribbble-user.ro';
import { DribbbleService } from './dribbble.service';
import Auth from 'src/auth/guards/auth.guard';
import { BindsService } from 'src/binds/binds.service';

@ApiTags('dribbble')
@Controller('dribbble')
export class DribbbleController {
  constructor(
    private readonly dribbbleService: DribbbleService,
    private readonly configService: ConfigService,
    private readonly bindsService: BindsService,
  ) {}

  @Get('authDribbble/:serviceId')
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  public authDribbble(@Param('serviceId') serviceId: string): string {
    const client_id = this.configService.get('CLIENT_ID');

    return `https://dribbble.com/oauth/authorize?${stringify({
      client_id,
      redirect_uri: `http://localhost:5000/api?service=${serviceId}`,
    })}&scope=public+write+upload`;
  }

  @Post('authDribbbleToken')
  @Auth()
  @ApiOperation({
    summary: 'Get and Bind dribbble Token',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: DribbbleUserRo,
  })
  @ApiBody({
    description: 'Auth Dribbble token code',
    type: DribbbleUserDto,
  })
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  public async authDribbbleToken(
    @Body(new ValidationPipe()) drbDto: DribbbleUserDto,
    @Req() req: Request,
  ) {
    const { userId } = req.user as { userId: string };

    const currentBind = await this.bindsService.preBindDribbble(userId);

    if (currentBind)
      throw new HttpException(
        'The binding already exists',
        HttpStatus.CONFLICT,
      );

    const { code, service } = drbDto;

    const { access_token } = await this.dribbbleService.authDribbble(
      code,
      service,
    );

    return await this.dribbbleService.authDribbbleByUser(
      userId,
      access_token,
      service,
    );
  }
}

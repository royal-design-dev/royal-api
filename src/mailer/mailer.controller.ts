import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MailerService } from './mailer.service';
import { SendMessageDto } from './types/dto/send-message.dto';

@ApiTags('mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SendMessageDto })
  @ApiOperation({
    summary: 'Send a new mail',
  })
  @ApiOkResponse({
    description: 'Successful operation',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async sendMail(@Body() message: SendMessageDto) {
    return this.mailerService.sendMail(message);
  }
}

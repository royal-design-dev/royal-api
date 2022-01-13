import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendMessageDto } from './types/dto/send-message.dto';

@Injectable()
export class MailerService {
  private readonly _transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this._transporter = nodemailer.createTransport(
      {
        host: this.configService.get('MAILER_HOST'),
        port: this.configService.get('MAILER_PORT'),
        secure: this.configService.get('MAILER_PORT') === '465',
        auth: {
          user: this.configService.get('MAILER_USER_FROM'),
          pass: this.configService.get('MAILER_PASS'),
        },
      },
      {
        from: this.configService.get('MAILER_USER_FROM'),
        to: this.configService.get('MAILER_USER_TO'),
      },
    );
  }

  async sendMail({
    message = 'message',
    subject = 'subject',
    receiver = '',
  }: SendMessageDto) {
    const payload = {
      subject: `${subject} ${receiver}`,
      text: message,
    };

    await this._transporter.sendMail(payload);
  }
}

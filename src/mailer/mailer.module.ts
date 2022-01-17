import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({
  imports: [],
  providers: [MailerService],
  controllers: [MailerController],
})
export class MailerModule {}
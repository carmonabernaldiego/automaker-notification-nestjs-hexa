import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { MailService } from './mail.service';
import { SmsService } from './sms.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, MailService, SmsService],
})
export class NotificationsModule {}

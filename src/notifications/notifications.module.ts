import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices'; // Solo importamos ClientsModule
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { MailService } from './mail.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, MailService],
})
export class NotificationsModule {}

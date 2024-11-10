import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Método que escucha los mensajes en la cola de RabbitMQ
  @EventPattern('send_notification')
  async handleNotification(payload: any) {
    const { type, email, code, resetLink } = payload;

    switch (type) {
      case 'login_error':
        return await this.notificationsService.notifyUserError(email);
      case 'confirmation_code':
        return await this.notificationsService.sendConfirmationCode(
          email,
          code,
        );
      case 'password_reset':
        return await this.notificationsService.sendPasswordReset(
          email,
          resetLink,
        );
      default:
        throw new Error('Tipo de notificación no soportado');
    }
  }
}

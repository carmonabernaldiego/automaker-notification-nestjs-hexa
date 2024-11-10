import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailService: MailService) {}

  async notifyUserError(email: string) {
    const subject = 'Error en el inicio de sesión';
    const text = 'Su nombre de usuario o contraseña es incorrecto.';
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #d9534f;">Error en el inicio de sesión</h2>
        <p>Estimado usuario,</p>
        <p>Su nombre de usuario o contraseña es incorrecto.</p>
      </div>
    `;
    await this.mailService.sendEmail(email, subject, text, html);
    return { message: 'Notificación de error enviada correctamente.' };
  }

  async sendConfirmationCode(email: string, code: string) {
    const subject = 'Código de Confirmación';
    const text = `Su código de confirmación es: ${code}`;
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #5cb85c;">Código de Confirmación</h2>
        <p>Estimado usuario,</p>
        <p>Gracias por registrarse. Su código de confirmación es:</p>
        <p style="font-size: 24px; font-weight: bold; color: #5cb85c;">${code}</p>
      </div>
    `;
    await this.mailService.sendEmail(email, subject, text, html);
    return { message: 'Código de confirmación enviado correctamente.' };
  }

  async sendPasswordReset(email: string, resetLink: string) {
    const subject = 'Restablecimiento de Contraseña';
    const text = `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`;
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #337ab7;">Restablecimiento de Contraseña</h2>
        <p>Estimado usuario,</p>
        <p>Hemos recibido una solicitud para restablecer su contraseña.</p>
        <p>Para proceder, haga clic en el siguiente botón:</p>
        <p style="text-align: center;">
          <a href="${resetLink}" style="background-color: #337ab7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Restablecer Contraseña
          </a>
        </p>
      </div>
    `;
    await this.mailService.sendEmail(email, subject, text, html);
    return {
      message:
        'Correo de restablecimiento de contraseña enviado correctamente.',
    };
  }
}

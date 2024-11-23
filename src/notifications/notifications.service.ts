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
        <p>Su código de confirmación es:</p>
        <p style="font-size: 24px; font-weight: bold; color: #5cb85c;">${code}</p>
      </div>
    `;
    await this.mailService.sendEmail(email, subject, text, html);
    return { message: 'Código de confirmación enviado correctamente.' };
  }

  async sendPasswordReset(email: string, code: string) {
    const subject = 'Restablecimiento de Contraseña';
    const text = `Tu código de restablecimiento de contraseña es: ${code}. Introduce este código en la aplicación para continuar con el proceso de cambio de contraseña.`;
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #337ab7;">Restablecimiento de Contraseña</h2>
        <p>Estimado usuario,</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Para continuar, por favor ingresa el siguiente código en la aplicación móvil:</p>
        <div style="text-align: center; margin-top: 20px;">
          <h3 style="font-size: 24px; font-weight: bold; color: #337ab7;">${code}</h3>
        </div>
      </div>
    `;
    await this.mailService.sendEmail(email, subject, text, html);
    return {
      message:
        'Correo de restablecimiento de contraseña enviado correctamente.',
    };
  }
}

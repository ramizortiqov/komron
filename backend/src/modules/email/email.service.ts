import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: this.config.get('SMTP_PORT'),
      secure: this.config.get('SMTP_SECURE') === 'true',
      auth: {
        user: this.config.get('SMTP_USER'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendOrderConfirmation(to: string, orderData: any) {
    await this.transporter.sendMail({
      from: this.config.get('SMTP_FROM_EMAIL'),
      to,
      subject: 'Подтверждение заказа - TM LIMITED',
      html: `<h1>Спасибо за заказ!</h1><p>Номер заказа: ${orderData.orderNumber}</p>`,
    });
  }

  async sendOrderStatusUpdate(to: string, orderData: any) {
    await this.transporter.sendMail({
      from: this.config.get('SMTP_FROM_EMAIL'),
      to,
      subject: 'Обновление статуса заказа - TM LIMITED',
      html: `<h1>Статус заказа изменен</h1><p>Новый статус: ${orderData.status}</p>`,
    });
  }
}

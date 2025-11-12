import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  private yookassaApi: any;

  constructor(private config: ConfigService) {
    const shopId = this.config.get('YOOKASSA_SHOP_ID');
    const secretKey = this.config.get('YOOKASSA_SECRET_KEY');
    const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64');

    this.yookassaApi = axios.create({
      baseURL: 'https://api.yookassa.ru/v3',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async createPayment(amount: number, orderId: string, returnUrl: string) {
    const response = await this.yookassaApi.post('/payments', {
      amount: {
        value: amount.toFixed(2),
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: returnUrl,
      },
      capture: true,
      description: `Заказ ${orderId}`,
      metadata: { orderId },
    });

    return response.data;
  }

  async handleWebhook(payload: any) {
    // Handle payment status updates from YooKassa
    return { received: true };
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create')
  createPayment(@Body() data: any) {
    return this.paymentsService.createPayment(data.amount, data.orderId, data.returnUrl);
  }

  @Post('webhook')
  handleWebhook(@Body() payload: any) {
    return this.paymentsService.handleWebhook(payload);
  }
}

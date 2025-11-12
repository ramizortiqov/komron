import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeliveryService } from './delivery.service';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @Post('calculate/cdek')
  calculateCdek(@Body() data: any) {
    return this.deliveryService.calculateCdekCost(data);
  }

  @Post('calculate/russianpost')
  calculateRussianPost(@Body() data: any) {
    return this.deliveryService.calculateRussianPostCost(data);
  }

  @Get('track')
  track(@Query('number') number: string, @Query('provider') provider: any) {
    return this.deliveryService.trackOrder(number, provider);
  }
}

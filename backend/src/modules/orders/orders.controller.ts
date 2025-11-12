import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() data: any) {
    return this.ordersService.create(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('track/:orderNumber')
  track(@Param('orderNumber') orderNumber: string, @Query('email') email?: string) {
    return this.ordersService.findByNumber(orderNumber);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateStatus(@Param('id') id: string, @Body() data: { status: any }) {
    return this.ordersService.updateStatus(id, data.status);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const totalOrders = await this.prisma.order.count();
    const totalRevenue = await this.prisma.order.aggregate({
      _sum: { total: true },
      where: { paymentStatus: 'PAID' },
    });

    const totalProducts = await this.prisma.product.count();

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      totalProducts,
    };
  }
}

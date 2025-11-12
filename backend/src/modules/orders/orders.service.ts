import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const orderNumber = `TM-${Date.now()}`;
    return this.prisma.order.create({
      data: { ...data, orderNumber },
      include: { items: true },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByNumber(orderNumber: string) {
    return this.prisma.order.findUnique({
      where: { orderNumber },
      include: { items: { include: { product: true } } },
    });
  }

  async updateStatus(id: string, status: any) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: any) {
    const { categoryId, search, skip = 0, take = 20, sortBy = 'createdAt', sortOrder = 'desc' } = params || {};

    const where: any = { isActive: true };

    if (categoryId) where.categoryId = categoryId;
    if (search) where.name = { contains: search, mode: 'insensitive' };

    return this.prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
      include: {
        category: true,
        variants: { where: { isActive: true } },
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: { where: { isActive: true } },
      },
    });
  }

  async create(data: any) {
    return this.prisma.product.create({ data, include: { variants: true } });
  }

  async update(id: string, data: any) {
    return this.prisma.product.update({ where: { id }, data });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        children: true,
        _count: { select: { products: true } },
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.category.findUnique({
      where: { slug },
      include: { children: true },
    });
  }

  async create(data: any) {
    return this.prisma.category.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.category.update({ where: { id }, data });
  }
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productsAPI, categoriesAPI } from '@/lib/api';
import { Product, Category } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getAll({ categoryId: selectedCategory }),
        categoriesAPI.getAll(),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container-custom py-20 text-center">Загрузка...</div>;
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-serif font-bold mb-8">Каталог</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 whitespace-nowrap ${
            !selectedCategory ? 'btn-primary' : 'btn-secondary'
          }`}
        >
          Все товары
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 whitespace-nowrap ${
              selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`} className="card-product">
            <div className="aspect-square bg-beige mb-4 overflow-hidden">
              {product.images[0] && (
                <div className="w-full h-full bg-beige group-hover:scale-105 transition-transform duration-500" />
              )}
              <div className="image-overlay" />
            </div>

            <h3 className="text-xl font-serif mb-2">{product.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">{formatPrice(Number(product.price))}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(Number(product.oldPrice))}
                </span>
              )}
            </div>

            {product.isNew && (
              <span className="inline-block mt-2 text-xs bg-darkGray text-white px-2 py-1">
                Новинка
              </span>
            )}
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-gray-600">
          Товары не найдены
        </div>
      )}
    </div>
  );
}

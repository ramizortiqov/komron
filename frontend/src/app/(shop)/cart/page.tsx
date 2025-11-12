'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [items]);

  const loadProducts = async () => {
    if (items.length === 0) {
      setLoading(false);
      return;
    }

    try {
      const productIds = [...new Set(items.map(item => item.productId))];
      const productsData: Record<string, Product> = {};

      for (const productId of productIds) {
        // В реальном приложении нужно получать по ID
        // Здесь упрощенная версия
      }

      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const product = products[item.productId];
      if (!product) return total;
      return total + Number(product.price) * item.quantity;
    }, 0);
  };

  if (loading) {
    return <div className="container-custom py-20 text-center">Загрузка...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Корзина пуста</h1>
        <Link href="/catalog" className="btn-primary inline-block">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-serif font-bold mb-8">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const product = products[item.productId];
            if (!product) return null;

            return (
              <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 border-b border-gray-200 pb-4">
                <div className="w-24 h-24 bg-beige flex-shrink-0" />

                <div className="flex-1">
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{formatPrice(Number(product.price))}</p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.variantId, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 border border-gray-300 hover:border-darkGray text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 hover:border-darkGray text-sm"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="ml-4 text-sm text-red-600 hover:text-red-700"
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium">{formatPrice(Number(product.price) * item.quantity)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-cream p-6 sticky top-24">
            <h2 className="text-2xl font-serif font-bold mb-4">Итого</h2>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Товары ({items.length})</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка</span>
                <span>Рассчитается при оформлении</span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Итого</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary w-full block text-center mb-3">
              Оформить заказ
            </Link>

            <Link href="/catalog" className="btn-secondary w-full block text-center">
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

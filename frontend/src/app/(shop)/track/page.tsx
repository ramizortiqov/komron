'use client';

import { useState } from 'react';
import { ordersAPI } from '@/lib/api';
import { Order } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const res = await ordersAPI.track(orderNumber, email);
      setOrder(res.data);
    } catch (err: any) {
      setError('Заказ не найден. Проверьте данные и попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: 'Ожидает оплаты',
      PAID: 'Оплачен',
      PROCESSING: 'Собирается',
      SHIPPED: 'Отправлен',
      DELIVERED: 'Доставлен',
      CANCELLED: 'Отменен',
      REFUNDED: 'Возврат средств',
    };
    return statusMap[status] || status;
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-8 text-center">Отследить заказ</h1>

        <form onSubmit={handleSubmit} className="bg-cream p-8 mb-8">
          <div className="mb-4">
            <label className="block font-medium mb-2">Номер заказа</label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="TM-1234567890"
              className="input-base"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="input-base"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Поиск...' : 'Отследить'}
          </button>
        </form>

        {order && (
          <div className="bg-white border border-gray-200 p-8">
            <h2 className="text-2xl font-serif font-bold mb-6">Информация о заказе</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Номер заказа:</span>
                <span>{order.orderNumber}</span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Статус:</span>
                <span className="font-medium text-darkGray">{getStatusText(order.status)}</span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Дата создания:</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Сумма:</span>
                <span>{formatPrice(Number(order.total))}</span>
              </div>

              {order.trackingNumber && (
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium">Трек-номер:</span>
                  <span>{order.trackingNumber}</span>
                </div>
              )}
            </div>

            <h3 className="font-medium mb-4">Товары в заказе:</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.productName} × {item.quantity}</span>
                  <span>{formatPrice(Number(item.subtotal))}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

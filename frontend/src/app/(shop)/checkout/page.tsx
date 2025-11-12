'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { ordersAPI, paymentsAPI } from '@/lib/api';
import { DeliveryMethod } from '@/types';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    zipCode: '',
    deliveryMethod: DeliveryMethod.CDEK_PICKUP,
    customerNote: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order
      const orderRes = await ordersAPI.create({
        customerFirstName: formData.firstName,
        customerLastName: formData.lastName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        deliveryMethod: formData.deliveryMethod,
        deliveryAddress: formData.address,
        deliveryCity: formData.city,
        deliveryZipCode: formData.zipCode,
        deliveryPrice: 500, // Simplified
        customerNote: formData.customerNote,
        subtotal: 10000, // Simplified
        total: 10500, // Simplified
        items: items.map(item => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      });

      const order = orderRes.data;

      // Create payment
      const paymentRes = await paymentsAPI.create({
        amount: order.total,
        orderId: order.id,
        returnUrl: `${window.location.origin}/checkout/success?order=${order.orderNumber}`,
      });

      // Redirect to payment
      window.location.href = paymentRes.data.confirmation.confirmation_url;

      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Ошибка при оформлении заказа');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-serif font-bold mb-8">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-cream p-8 mb-6">
          <h2 className="text-2xl font-serif font-bold mb-6">Контактная информация</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Имя *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="input-base"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Фамилия *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="input-base"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-medium mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-base"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block font-medium mb-2">Телефон *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-base"
              required
            />
          </div>
        </div>

        <div className="bg-cream p-8 mb-6">
          <h2 className="text-2xl font-serif font-bold mb-6">Доставка</h2>

          <div className="mb-4">
            <label className="block font-medium mb-2">Способ доставки</label>
            <select
              value={formData.deliveryMethod}
              onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value as DeliveryMethod })}
              className="input-base"
            >
              <option value={DeliveryMethod.CDEK_PICKUP}>СДЭК - Пункт выдачи</option>
              <option value={DeliveryMethod.CDEK_COURIER}>СДЭК - Курьер</option>
              <option value={DeliveryMethod.RUSSIAN_POST}>Почта России</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Город *</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="input-base"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Адрес *</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="input-base"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Комментарий к заказу</label>
            <textarea
              value={formData.customerNote}
              onChange={(e) => setFormData({ ...formData, customerNote: e.target.value })}
              className="input-base"
              rows={3}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Обработка...' : 'Перейти к оплате'}
        </button>
      </form>
    </div>
  );
}

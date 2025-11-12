'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      const res = await productsAPI.getBySlug(slug);
      setProduct(res.data);
      if (res.data.variants && res.data.variants.length > 0) {
        setSelectedVariant(res.data.variants[0].id);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      productId: product.id,
      variantId: selectedVariant || undefined,
      quantity,
    });

    toast.success('Товар добавлен в корзину');
  };

  const handleToggleWishlist = () => {
    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Удалено из избранного');
    } else {
      addToWishlist(product.id);
      toast.success('Добавлено в избранное');
    }
  };

  if (loading) {
    return <div className="container-custom py-20 text-center">Загрузка...</div>;
  }

  if (!product) {
    return <div className="container-custom py-20 text-center">Товар не найден</div>;
  }

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <div className="aspect-square bg-beige mb-4">
            {product.images[0] && <div className="w-full h-full bg-beige" />}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">{formatPrice(Number(product.price))}</span>
            {product.oldPrice && (
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(Number(product.oldPrice))}
              </span>
            )}
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Размер</h3>
              <div className="flex gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`px-4 py-2 border ${
                      selectedVariant === variant.id
                        ? 'border-darkGray bg-darkGray text-white'
                        : 'border-gray-300 hover:border-darkGray'
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Количество</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 hover:border-darkGray"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 hover:border-darkGray"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <button onClick={handleAddToCart} className="btn-primary flex-1">
              Добавить в корзину
            </button>
            <button
              onClick={handleToggleWishlist}
              className="btn-secondary w-12 flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium mb-3">Описание</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {product.composition && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Состав</h4>
                <p className="text-gray-600">{product.composition}</p>
              </div>
            )}

            {product.care && (
              <div>
                <h4 className="font-medium mb-2">Уход</h4>
                <p className="text-gray-600">{product.care}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';

export default function Header() {
  const { getTotalItems } = useCartStore();
  const wishlist = useWishlistStore();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold tracking-wider">
            TM LIMITED
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/catalog" className="hover:text-deepGray transition-colors">
              Каталог
            </Link>
            <Link href="/about" className="hover:text-deepGray transition-colors">
              О бренде
            </Link>
            <Link href="/delivery" className="hover:text-deepGray transition-colors">
              Доставка
            </Link>
            <Link href="/contacts" className="hover:text-deepGray transition-colors">
              Контакты
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Link href="/track" className="hover:text-deepGray transition-colors">
              Отследить заказ
            </Link>
            <Link href="/wishlist" className="relative hover:text-deepGray transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-darkGray text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.items.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative hover:text-deepGray transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-darkGray text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-gray-200 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">TM LIMITED</h3>
            <p className="text-sm text-gray-600">
              Вневременная элегантность и безупречное качество
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog" className="text-gray-600 hover:text-darkGray">Каталог</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-darkGray">О бренде</Link></li>
              <li><Link href="/delivery" className="text-gray-600 hover:text-darkGray">Доставка и оплата</Link></li>
              <li><Link href="/returns" className="text-gray-600 hover:text-darkGray">Возврат и обмен</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-medium mb-4">Помощь</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/track" className="text-gray-600 hover:text-darkGray">Отследить заказ</Link></li>
              <li><Link href="/contacts" className="text-gray-600 hover:text-darkGray">Контакты</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-darkGray">Вопросы и ответы</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-medium mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: info@tm-limited.ru</li>
              <li>Телефон: +7 (495) 123-45-67</li>
              <li>Ежедневно: 10:00 - 22:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} TM LIMITED. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

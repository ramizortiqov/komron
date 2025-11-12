import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-cream">
        <div className="text-center z-10">
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
            Вневременная элегантность
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in animation-delay-200">
            Коллекция премиальной одежды в стиле Old Money
          </p>
          <Link
            href="/catalog"
            className="btn-primary inline-block animate-fade-in animation-delay-400"
          >
            Смотреть коллекцию
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 container-custom">
        <h2 className="text-4xl font-serif font-bold text-center mb-12">
          Наши категории
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/catalog/muzhskaya-odezhda" className="group">
            <div className="aspect-square bg-gray-200 overflow-hidden">
              <div className="w-full h-full bg-beige group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl font-serif mt-4 group-hover:text-deepGray transition-colors">
              Мужская одежда
            </h3>
          </Link>

          <Link href="/catalog/zhenskaya-odezhda" className="group">
            <div className="aspect-square bg-gray-200 overflow-hidden">
              <div className="w-full h-full bg-beige group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl font-serif mt-4 group-hover:text-deepGray transition-colors">
              Женская одежда
            </h3>
          </Link>

          <Link href="/catalog/aksessuary" className="group">
            <div className="aspect-square bg-gray-200 overflow-hidden">
              <div className="w-full h-full bg-beige group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl font-serif mt-4 group-hover:text-deepGray transition-colors">
              Аксессуары
            </h3>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-6">О бренде</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            TM LIMITED — это философия вневременной элегантности и безупречного качества.
            Мы создаем одежду для тех, кто ценит классический стиль, качество материалов
            и внимание к деталям.
          </p>
          <Link href="/about" className="btn-secondary inline-block mt-8">
            Узнать больше
          </Link>
        </div>
      </section>
    </div>
  );
}

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create Admin Users
  console.log('Creating admin users...');

  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const managerPassword = await bcrypt.hash('Manager123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tm-limited.ru' },
    update: {},
    create: {
      email: 'admin@tm-limited.ru',
      password: adminPassword,
      firstName: 'Администратор',
      lastName: 'TM Limited',
      role: 'ADMIN',
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@tm-limited.ru' },
    update: {},
    create: {
      email: 'manager@tm-limited.ru',
      password: managerPassword,
      firstName: 'Менеджер',
      lastName: 'TM Limited',
      role: 'MANAGER',
    },
  });

  console.log('✅ Admin users created');

  // 2. Create Categories
  console.log('Creating categories...');

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'muzhskaya-odezhda' },
      update: {},
      create: {
        name: 'Мужская одежда',
        slug: 'muzhskaya-odezhda',
        description: 'Премиальная мужская одежда',
        metaTitle: 'Мужская одежда - TM LIMITED',
        metaDescription: 'Коллекция премиальной мужской одежды в стиле Old Money',
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'zhenskaya-odezhda' },
      update: {},
      create: {
        name: 'Женская одежда',
        slug: 'zhenskaya-odezhda',
        description: 'Премиальная женская одежда',
        metaTitle: 'Женская одежда - TM LIMITED',
        metaDescription: 'Коллекция премиальной женской одежды в стиле Old Money',
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'aksessuary' },
      update: {},
      create: {
        name: 'Аксессуары',
        slug: 'aksessuary',
        description: 'Премиальные аксессуары',
        metaTitle: 'Аксессуары - TM LIMITED',
        metaDescription: 'Изысканные аксессуары для завершения образа',
        isActive: true,
        sortOrder: 3,
      },
    }),
  ]);

  console.log('✅ Categories created');

  // 3. Create Sample Products
  console.log('Creating sample products...');

  const sampleProducts = [
    {
      name: 'Кашемировый свитер',
      slug: 'kashemirovyy-sviter',
      sku: 'TM-SW-001',
      description: 'Роскошный кашемировый свитер из 100% монгольского кашемира. Классический крой, безупречное качество.',
      price: 45000,
      oldPrice: 55000,
      composition: '100% кашемир (Монголия)',
      care: 'Ручная стирка в холодной воде. Сушить горизонтально.',
      images: ['/images/products/sweater-1.jpg'],
      categoryId: categories[0].id,
      isNew: true,
      isFeatured: true,
      inStock: true,
      metaTitle: 'Кашемировый свитер премиум качества - TM LIMITED',
      metaDescription: '100% монгольский кашемир, классический крой',
    },
    {
      name: 'Шерстяное пальто',
      slug: 'sherstyanoe-palto',
      sku: 'TM-CT-001',
      description: 'Элегантное шерстяное пальто прямого кроя. Идеально для межсезонья.',
      price: 85000,
      composition: '90% шерсть, 10% кашемир',
      care: 'Только химчистка',
      images: ['/images/products/coat-1.jpg'],
      categoryId: categories[1].id,
      isNew: false,
      isFeatured: true,
      inStock: true,
      metaTitle: 'Шерстяное пальто премиум класса - TM LIMITED',
      metaDescription: 'Элегантное пальто из шерсти и кашемира',
    },
    {
      name: 'Кожаная сумка',
      slug: 'kozhanaya-sumka',
      sku: 'TM-BG-001',
      description: 'Классическая кожаная сумка ручной работы из итальянской кожи.',
      price: 35000,
      composition: '100% натуральная кожа (Италия)',
      care: 'Протирать влажной тканью. Использовать кондиционер для кожи.',
      images: ['/images/products/bag-1.jpg'],
      categoryId: categories[2].id,
      isNew: true,
      isFeatured: false,
      inStock: true,
      metaTitle: 'Кожаная сумка ручной работы - TM LIMITED',
      metaDescription: 'Сумка из итальянской кожи премиум качества',
    },
  ];

  for (const productData of sampleProducts) {
    const product = await prisma.product.create({
      data: productData,
    });

    // Create variants for each product
    await prisma.productVariant.createMany({
      data: [
        {
          productId: product.id,
          size: 'S',
          color: 'Бежевый',
          colorHex: '#F5F5DC',
          quantity: 5,
          sku: `${product.sku}-S-BEIGE`,
        },
        {
          productId: product.id,
          size: 'M',
          color: 'Бежевый',
          colorHex: '#F5F5DC',
          quantity: 10,
          sku: `${product.sku}-M-BEIGE`,
        },
        {
          productId: product.id,
          size: 'L',
          color: 'Бежевый',
          colorHex: '#F5F5DC',
          quantity: 7,
          sku: `${product.sku}-L-BEIGE`,
        },
      ],
    });
  }

  console.log('✅ Sample products created');

  // 4. Create Static Pages
  console.log('Creating static pages...');

  await prisma.page.upsert({
    where: { slug: 'o-brende' },
    update: {},
    create: {
      title: 'О бренде',
      slug: 'o-brende',
      content: `
        <h1>О бренде TM LIMITED</h1>
        <p>TM LIMITED — это философия вневременной элегантности и безупречного качества.</p>
        <p>Мы создаем одежду для тех, кто ценит классический стиль, качество материалов и внимание к деталям.</p>
      `,
      metaTitle: 'О бренде TM LIMITED',
      metaDescription: 'История и философия премиального бренда одежды TM LIMITED',
      isActive: true,
    },
  });

  await prisma.page.upsert({
    where: { slug: 'dostavka-i-oplata' },
    update: {},
    create: {
      title: 'Доставка и оплата',
      slug: 'dostavka-i-oplata',
      content: `
        <h1>Доставка и оплата</h1>
        <h2>Доставка</h2>
        <p>Мы осуществляем доставку по всей России через СДЭК и Почту РФ.</p>
        <h2>Оплата</h2>
        <p>Принимаем оплату банковскими картами, СБП, SberPay.</p>
      `,
      metaTitle: 'Доставка и оплата - TM LIMITED',
      metaDescription: 'Информация о доставке и оплате заказов',
      isActive: true,
    },
  });

  await prisma.page.upsert({
    where: { slug: 'vozvrat-i-obmen' },
    update: {},
    create: {
      title: 'Возврат и обмен',
      slug: 'vozvrat-i-obmen',
      content: `
        <h1>Возврат и обмен</h1>
        <p>Вы можете вернуть или обменять товар в течение 14 дней с момента получения.</p>
      `,
      metaTitle: 'Возврат и обмен - TM LIMITED',
      metaDescription: 'Условия возврата и обмена товаров',
      isActive: true,
    },
  });

  console.log('✅ Static pages created');

  // 5. Create Homepage Banner
  console.log('Creating homepage banner...');

  await prisma.banner.create({
    data: {
      title: 'Новая коллекция',
      subtitle: 'Вневременная элегантность',
      image: '/images/banners/hero-banner.jpg',
      link: '/catalog',
      buttonText: 'Смотреть коллекцию',
      isActive: true,
      sortOrder: 1,
    },
  });

  console.log('✅ Homepage banner created');

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📧 Admin credentials:');
  console.log('Email: admin@tm-limited.ru');
  console.log('Password: Admin123!');
  console.log('\n📧 Manager credentials:');
  console.log('Email: manager@tm-limited.ru');
  console.log('Password: Manager123!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

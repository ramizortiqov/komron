import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'TM LIMITED - Премиальная одежда',
  description: 'Вневременная элегантность и безупречное качество. Премиальный бренд одежды в стиле Old Money.',
  keywords: ['одежда', 'премиум', 'люкс', 'старые деньги', 'классика'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

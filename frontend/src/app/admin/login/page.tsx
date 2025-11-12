'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authAPI.login(email, password);
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Успешный вход');
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error('Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-serif font-bold text-center mb-8">TM LIMITED Admin</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-base"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-base"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          По умолчанию:<br />
          Email: admin@tm-limited.ru<br />
          Пароль: Admin123!
        </p>
      </div>
    </div>
  );
}

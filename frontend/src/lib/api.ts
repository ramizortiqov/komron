import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor для добавления токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products API
export const productsAPI = {
  getAll: (params?: any) => api.get('/products', { params }),
  getBySlug: (slug: string) => api.get(`/products/${slug}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getBySlug: (slug: string) => api.get(`/categories/${slug}`),
};

// Orders API
export const ordersAPI = {
  create: (data: any) => api.post('/orders', data),
  track: (orderNumber: string, email?: string) =>
    api.get(`/orders/track/${orderNumber}`, { params: { email } }),
};

// Auth API (for admin)
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

// Payments API
export const paymentsAPI = {
  create: (data: any) => api.post('/payments/create', data),
};

// Delivery API
export const deliveryAPI = {
  calculateCdek: (data: any) => api.post('/delivery/calculate/cdek', data),
  calculateRussianPost: (data: any) => api.post('/delivery/calculate/russianpost', data),
  track: (number: string, provider: 'cdek' | 'russianpost') =>
    api.get('/delivery/track', { params: { number, provider } }),
};

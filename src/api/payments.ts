import { request } from './client';
import type { Payment, Receipt } from '../types/payment';

export const paymentsApi = {
  list: () => request<Payment[]>('/payments'),
  create: (payload: Omit<Payment, 'id' | 'status'>) => request<Payment>('/payments', { method: 'POST', body: payload }),
};

export const receiptsApi = {
  list: () => request<Receipt[]>('/receipts'),
  generate: (paymentId: string) => request<Receipt>(`/payments/${encodeURIComponent(paymentId)}/receipt`, { method: 'POST' }),
};

import { request } from './client';
import type { Customer } from '../types/customer';

export const customersApi = {
  list: () => request<Customer[]>('/customers'),
  get: (id: string) => request<Customer>(`/customers/${encodeURIComponent(id)}`),
  create: (payload: Omit<Customer, 'id'>) => request<Customer>('/customers', { method: 'POST', body: payload }),
  update: (id: string, payload: Partial<Customer>) => request<Customer>(`/customers/${encodeURIComponent(id)}`, { method: 'PUT', body: payload }),
};

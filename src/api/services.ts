import { request } from './client';
import type { Service } from '../types/service';

export const servicesApi = {
  list: () => request<Service[]>('/services'),
  create: (payload: Omit<Service, 'id'>) => request<Service>('/services', { method: 'POST', body: payload }),
  update: (id: string, payload: Partial<Service>) => request<Service>(`/services/${encodeURIComponent(id)}`, { method: 'PUT', body: payload }),
};

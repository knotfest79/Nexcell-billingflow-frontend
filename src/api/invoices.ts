import { request } from './client';
import type { Invoice, InvoiceRevision } from '../types/invoice';

export const invoicesApi = {
  list: () => request<Invoice[]>('/invoices'),
  get: (id: string) => request<Invoice>(`/invoices/${encodeURIComponent(id)}`),
  create: (payload: Omit<Invoice, 'id' | 'invoiceNumber'>) => request<Invoice>('/invoices', { method: 'POST', body: payload }),
  update: (id: string, payload: Partial<Invoice>) => request<Invoice>(`/invoices/${encodeURIComponent(id)}`, { method: 'PUT', body: payload }),
  revisions: (id: string) => request<InvoiceRevision[]>(`/invoices/${encodeURIComponent(id)}/revisions`),
};

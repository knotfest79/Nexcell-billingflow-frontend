import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import * as mock from '../data/mockData';
import type { Customer } from '../types/customer';
import type { Invoice, InvoiceRevision } from '../types/invoice';
import type { Payment, Receipt } from '../types/payment';
import type { Service } from '../types/service';

interface MutationResult {
  ok: boolean;
  error?: string;
}

interface DataContextValue {
  customers: Customer[];
  services: Service[];
  invoices: Invoice[];
  payments: Payment[];
  receipts: Receipt[];
  revisions: InvoiceRevision[];
  addCustomer: (customer: Omit<Customer, 'id'>) => MutationResult;
  addService: (service: Omit<Service, 'id'>) => MutationResult;
  addPayment: (payment: Omit<Payment, 'id' | 'status'>) => void;
  addInvoice: (invoice: Invoice) => void;
  addRevision: (revision: InvoiceRevision) => void;
  getCustomer: (id: string) => Customer | undefined;
  getService: (id: string) => Service | undefined;
  getInvoice: (id: string) => Invoice | undefined;
}

const DataContext = createContext<DataContextValue | null>(null);

const normalizeId = (id: string) => id.replace(/^#/, '');

export function DataProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(mock.customers);
  const [services, setServices] = useState<Service[]>(mock.services);
  const [invoices, setInvoices] = useState<Invoice[]>(mock.invoices);
  const [payments, setPayments] = useState<Payment[]>(mock.payments);
  const [receipts, setReceipts] = useState<Receipt[]>(mock.receipts);
  const [revisions, setRevisions] = useState<InvoiceRevision[]>(mock.revisions);

  const value = useMemo<DataContextValue>(() => ({
    customers,
    services,
    invoices,
    payments,
    receipts,
    revisions,
    addCustomer: (customer) => {
      if (!customer.name.trim() || !customer.businessCode.trim()) {
        return { ok: false, error: 'Enter a business name and code' };
      }
      if (customers.some((c) => c.businessCode === customer.businessCode)) {
        return { ok: false, error: `Business code ${customer.businessCode} is already used` };
      }
      setCustomers((current) => [...current, { ...customer, id: customer.businessCode }]);
      return { ok: true };
    },
    addService: (service) => {
      if (!service.name.trim() || !service.code.trim()) {
        return { ok: false, error: 'Enter a service name and code' };
      }
      if (services.some((s) => s.code === service.code)) {
        return { ok: false, error: `Service code ${service.code} is already used` };
      }
      setServices((current) => [...current, { ...service, id: service.code }]);
      return { ok: true };
    },
    addPayment: (payment) => {
      const nextNumber = `PAY-${String(94 + payments.length - mock.payments.length).padStart(4, '0')}`;
      setPayments((current) => [...current, { ...payment, id: nextNumber, status: 'Paid' }]);
      setReceipts((current) => [
        ...current,
        {
          id: `RCT-00${41 + current.length}`,
          invoiceNumber: payment.invoiceNumber,
          customerName: payment.customerName,
          date: payment.paymentDate,
          amount: payment.amount,
          method: payment.method,
        },
      ]);
    },
    addInvoice: (invoice) => setInvoices((current) => [invoice, ...current]),
    addRevision: (revision) => setRevisions((current) => [...current, revision]),
    getCustomer: (id) => customers.find((c) => c.id === id || c.businessCode === id),
    getService: (id) => services.find((s) => s.id === id || s.code === id),
    getInvoice: (id) => invoices.find((i) => i.id === normalizeId(id) || i.invoiceNumber === id),
  }), [customers, services, invoices, payments, receipts, revisions]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}

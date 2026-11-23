import type { Customer } from '../types/customer';
import type { Invoice, InvoiceItem, PaymentDetails } from '../types/invoice';
import type { Receipt } from '../types/payment';

const fixturePaymentDetails: PaymentDetails = {
  bankName: 'NAB',
  accountName: 'Nexcell Digital',
  bsb: '085-005',
  accountNumber: '940791500',
};

const item = (
  id: string,
  description: string,
  details: string,
  qty: number,
  unitPrice: number,
): InvoiceItem => ({ id, description, details, qty, unitPrice, amount: qty * unitPrice });

export const PIZZA_CAFE_CUSTOMER: Customer = {
  id: 'PIZZA',
  businessCode: 'PizzaCafe',
  name: 'Pizza Cafe',
  email: 'info@pizzacafe.com.au',
  phone: '03 5022 2223',
  address: '18 Langtree Ave, Mildura, VIC 3500',
  totalInvoiced: 300,
  outstanding: 300,
  lastInvoice: '23 Nov 2026',
  status: 'Active',
};

export const PIZZA_CAFE_INVOICE: Invoice = {
  id: '830808-PizzaCafe-WHM',
  invoiceNumber: '#830808-PizzaCafe-WHM',
  customerId: PIZZA_CAFE_CUSTOMER.id,
  businessCode: PIZZA_CAFE_CUSTOMER.businessCode,
  serviceCode: 'WHM',
  serviceName: 'Website Hosting & Maintenance',
  invoiceDate: '2026-11-23',
  dueDate: '2026-11-24',
  status: 'unpaid',
  displayStatus: 'Unpaid',
  items: [
    item('pizza-1', 'Website Hosting & Maintenance', '1 year - 25/26', 1, 250),
    item('pizza-2', 'SSL', 'yearly renewal [25/26]', 1, 50),
  ],
  subtotal: 300,
  tax: 0,
  discount: 0,
  total: 300,
  amountPaid: 0,
  balanceDue: 300,
  currency: 'AUD',
  notes: '',
  internalNotes: '',
  paymentDetails: fixturePaymentDetails,
};

export const GUTHI_CUSTOMER: Customer = {
  id: 'GUTHISA',
  businessCode: 'GUTHISA',
  name: 'Guthi South Australia',
  email: 'info@guthisa.org.au',
  phone: '0450 077 969',
  address: 'Adelaide, SA',
  totalInvoiced: 250,
  outstanding: 0,
  lastInvoice: '22 May 2026',
  status: 'Active',
};

const guthiItems: InvoiceItem[] = [
  item('guthi-1', 'Website Design & development', 'Partial Payment', 1, 250),
];

export const GUTHI_INVOICE: Invoice = {
  id: '830208-GUTHISA-WDD',
  invoiceNumber: '#830208-GUTHISA-WDD',
  customerId: GUTHI_CUSTOMER.id,
  businessCode: GUTHI_CUSTOMER.businessCode,
  serviceCode: 'WDD',
  serviceName: 'Website Design & development',
  invoiceDate: '2026-05-22',
  dueDate: '2026-05-25',
  status: 'paid',
  displayStatus: 'Paid',
  items: guthiItems,
  subtotal: 250,
  tax: 0,
  discount: 0,
  total: 250,
  amountPaid: 250,
  balanceDue: 0,
  currency: 'AUD',
  notes: '',
  internalNotes: '',
  paymentDetails: fixturePaymentDetails,
};

export const GUTHI_RECEIPT: Receipt = {
  id: 'R-830208-GUTHISA-WDD',
  invoiceNumber: GUTHI_INVOICE.invoiceNumber,
  customerName: GUTHI_CUSTOMER.name,
  date: '2026-05-25',
  amount: 250,
  method: 'Bank Transfer',
};

export const GUTHI_PARTIAL_INVOICE: Invoice = {
  ...GUTHI_INVOICE,
  status: 'partially_paid',
  displayStatus: 'Partial',
  amountPaid: 100,
  balanceDue: 150,
};

export const GUTHI_PARTIAL_RECEIPT: Receipt = {
  ...GUTHI_RECEIPT,
  amount: 100,
};

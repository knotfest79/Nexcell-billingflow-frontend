import type { Customer } from '../types/customer';
import type { Invoice, InvoiceActivity, InvoiceItem, InvoiceRevision, PaymentDetails } from '../types/invoice';
import type { Payment, Receipt } from '../types/payment';
import type { Service } from '../types/service';

export const DEFAULT_PAYMENT_DETAILS: PaymentDetails = {
  bankName: 'NAB',
  accountName: 'Nexcell Digital',
  bsb: '085-005',
  accountNumber: '••••••500',
};

export const customers: Customer[] = [
  {
    id: 'EST',
    businessCode: 'EST',
    name: 'Eastern Sands Motel',
    email: 'easternsands1@gmail.com',
    phone: '03 5221 5577',
    address: '1 Belerine Street, Geelong VIC 3220',
    totalInvoiced: 1206,
    outstanding: 556,
    lastInvoice: '03 Aug 2026',
    status: 'Active',
  },
  {
    id: 'NDC',
    businessCode: 'NDC',
    name: 'No Drama Cleaning',
    email: 'hello@nodramacleaning.com.au',
    phone: '0412 345 678',
    address: 'Address not set',
    totalInvoiced: 1120,
    outstanding: 1120,
    lastInvoice: '14 Aug 2026',
    status: 'Active',
  },
  {
    id: 'BLU',
    businessCode: 'BLU',
    name: 'Blu Ginger',
    email: 'info@bluginger.com.au',
    phone: '08 8271 9000',
    address: 'Address not set',
    totalInvoiced: 670,
    outstanding: 250,
    lastInvoice: '20 Aug 2026',
    status: 'Active',
  },
  {
    id: 'DRA',
    businessCode: 'DRA',
    name: 'Drever Automotive',
    email: 'service@dreverautomotive.com.au',
    phone: '03 5983 2211',
    address: 'Address not set',
    totalInvoiced: 1080,
    outstanding: 0,
    lastInvoice: '18 Aug 2026',
    status: 'Active',
  },
];

export const services: Service[] = [
  {
    id: 'WHM',
    code: 'WHM',
    name: 'Website Hosting & Maintenance',
    description: '1 Year',
    defaultPrice: 300,
    taxBehaviour: 'gst_inclusive',
    billing: 'Annual',
    invoices: 3,
    active: true,
  },
  {
    id: 'WDD',
    code: 'WDD',
    name: 'Website Design',
    defaultPrice: 650,
    taxBehaviour: 'gst_inclusive',
    billing: 'Project',
    invoices: 3,
    active: true,
  },
  {
    id: 'MNU',
    code: 'MNU',
    name: 'Digital Menu',
    defaultPrice: 420,
    taxBehaviour: 'gst_inclusive',
    billing: 'Project',
    invoices: 1,
    active: true,
  },
  {
    id: 'SEO',
    code: 'SEO',
    name: 'SEO Setup',
    defaultPrice: 480,
    taxBehaviour: 'gst_inclusive',
    billing: 'Project',
    invoices: 1,
    active: true,
  },
];

const item = (id: string, description: string, details: string, qty: number, unitPrice: number): InvoiceItem => ({
  id,
  description,
  details,
  qty,
  unitPrice,
  amount: qty * unitPrice,
});

export const newInvoiceItems: InvoiceItem[] = [
  item('whm-1', 'Website Hosting & Maintenance', '1 Year', 1, 300),
  item('whm-2', 'Domain Renewal', 'easternsandsmotel.com.au', 1, 80),
  item('whm-3', 'SSL Certificate', 'Yearly Renewal', 1, 80),
  item('whm-4', 'Business Email Hosting', 'Annual Renewal', 1, 96),
];

type Seed = {
  number: string;
  customerId: string;
  serviceCode: string;
  serviceName: string;
  date: string;
  due: string;
  total: number;
  status: Invoice['status'];
  displayStatus: Invoice['displayStatus'];
  items?: InvoiceItem[];
};

const invoiceSeeds: Seed[] = [
  { number: '830418-EST-WDD', customerId: 'EST', serviceCode: 'WDD', serviceName: 'Website Design', date: '2026-08-03', due: '2026-08-10', total: 650, status: 'paid', displayStatus: 'Paid' },
  { number: '830418-EST-WHM', customerId: 'EST', serviceCode: 'WHM', serviceName: 'Hosting & Maintenance', date: '2026-08-03', due: '2026-08-04', total: 556, status: 'unpaid', displayStatus: 'Unpaid', items: newInvoiceItems },
  { number: '830421-NDC-WDD', customerId: 'NDC', serviceCode: 'WDD', serviceName: 'Website Development', date: '2026-08-06', due: '2026-08-13', total: 800, status: 'overdue', displayStatus: 'Overdue' },
  { number: '830425-DRA-WDD', customerId: 'DRA', serviceCode: 'WDD', serviceName: 'Website Redesign', date: '2026-08-10', due: '2026-08-17', total: 600, status: 'draft', displayStatus: 'Draft' },
  { number: '830427-BLU-MNU', customerId: 'BLU', serviceCode: 'MNU', serviceName: 'Digital Menu', date: '2026-08-12', due: '2026-08-19', total: 420, status: 'sent', displayStatus: 'Sent' },
  { number: '830430-NDC-WHM', customerId: 'NDC', serviceCode: 'WHM', serviceName: 'Hosting & Maintenance', date: '2026-08-14', due: '2026-08-21', total: 320, status: 'overdue', displayStatus: 'Overdue' },
  { number: '830433-DRA-SEO', customerId: 'DRA', serviceCode: 'SEO', serviceName: 'SEO Setup', date: '2026-08-18', due: '2026-08-25', total: 480, status: 'paid', displayStatus: 'Paid' },
  { number: '830436-BLU-WHM', customerId: 'BLU', serviceCode: 'WHM', serviceName: 'Hosting & Maintenance', date: '2026-08-20', due: '2026-08-27', total: 250, status: 'unpaid', displayStatus: 'Unpaid' },
];

export const invoices: Invoice[] = invoiceSeeds.map((seed) => {
  const customer = customers.find((c) => c.id === seed.customerId)!;
  const items = seed.items ?? [item(`${seed.number}-1`, seed.serviceName, 'Annual service', 1, seed.total)];
  const amountPaid = seed.status === 'paid' ? seed.total : 0;
  return {
    id: seed.number,
    invoiceNumber: `#${seed.number}`,
    customerId: seed.customerId,
    businessCode: customer.businessCode,
    serviceCode: seed.serviceCode,
    serviceName: seed.serviceName,
    invoiceDate: seed.date,
    dueDate: seed.due,
    status: seed.status,
    displayStatus: seed.displayStatus,
    items,
    subtotal: seed.total,
    tax: 0,
    discount: 0,
    total: seed.total,
    amountPaid,
    balanceDue: seed.total - amountPaid,
    currency: 'AUD',
    notes: '',
    internalNotes: '',
    paymentDetails: DEFAULT_PAYMENT_DETAILS,
  };
});

export const payments: Payment[] = [
  { id: 'PAY-0091', invoiceNumber: '#830418-EST-WDD', customerName: 'Eastern Sands Motel', paymentDate: '05 Aug 2026', amount: 650, method: 'Bank Transfer', reference: 'NAB-88213', status: 'Paid' },
  { id: 'PAY-0092', invoiceNumber: '#830433-DRA-SEO', customerName: 'Drever Automotive', paymentDate: '22 Aug 2026', amount: 480, method: 'Card', reference: 'CARD-4417', status: 'Paid' },
  { id: 'PAY-0093', invoiceNumber: '#830427-BLU-MNU', customerName: 'Blu Ginger', paymentDate: '24 Aug 2026', amount: 200, method: 'Cash', reference: '—', status: 'Paid' },
];

export const receipts: Receipt[] = payments.map((payment, index) => ({
  id: `RCT-00${index + 41}`,
  invoiceNumber: payment.invoiceNumber,
  customerName: payment.customerName,
  date: payment.paymentDate,
  amount: payment.amount,
  method: payment.method,
}));

export const revisions: InvoiceRevision[] = [
  { n: 1, date: '03 Aug 2026', note: 'Original invoice created', total: 556 },
  { n: 2, date: '05 Aug 2026', note: 'Customer email corrected', total: 556 },
];

export const invoiceActivity: InvoiceActivity[] = [
  { label: 'Invoice created', date: '03 Aug 2026' },
  { label: 'Invoice emailed', date: '03 Aug 2026' },
  { label: 'Reminder sent', date: '10 Aug 2026' },
  { label: 'Payment pending', pending: true },
];

export const settingsSections = [
  'Business Profile',
  'Invoice Settings',
  'Payment Details',
  'Email',
  'Notifications',
  'Reminders',
  'Tax',
  'Cloud & Sync',
  'Security',
  'Appearance',
] as const;

export const ageingRows = [
  { label: 'Current', display: '$1,570.00', width: 60 },
  { label: '1–14 days', display: '$556.00', width: 25 },
  { label: '15–30 days', display: '$800.00', width: 35 },
  { label: '30+ days', display: '$320.00', width: 15 },
];

export const topCustomers = [
  { label: 'Eastern Sands Motel', amount: 1206, width: 100 },
  { label: 'No Drama Cleaning', amount: 1120, width: 93 },
  { label: 'Drever Automotive', amount: 1080, width: 90 },
];

export const serviceRevenue = [
  { label: 'Website design', amount: 6400, width: 100 },
  { label: 'Hosting & maintenance', amount: 3900, width: 61 },
  { label: 'SEO', amount: 1800, width: 28 },
];

export const revenueBars = [90, 120, 100, 150, 130, 170, 160, 190, 175, 200, 185, 210];

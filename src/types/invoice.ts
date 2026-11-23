export type InvoiceStatus =
  | 'draft'
  | 'sent'
  | 'unpaid'
  | 'partially_paid'
  | 'paid'
  | 'overdue'
  | 'cancelled';

export type DisplayStatus =
  | 'Paid'
  | 'Unpaid'
  | 'Overdue'
  | 'Draft'
  | 'Sent'
  | 'Partial'
  | 'Active';

export interface InvoiceItem {
  id: string;
  description: string;
  details?: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

export interface PaymentDetails {
  bankName: string;
  accountName: string;
  bsb: string;
  accountNumber: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  businessCode: string;
  serviceCode: string;
  serviceName: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  displayStatus: DisplayStatus;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  currency: string;
  notes?: string;
  internalNotes?: string;
  paymentDetails: PaymentDetails;
}

export interface InvoiceDraft {
  customerId: string;
  serviceId: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  items: InvoiceItem[];
  notes: string;
  internalNotes: string;
  paymentDetails: PaymentDetails;
  backdatedReason: string;
  backdatedConfirmed: boolean;
}

export interface InvoiceRevision {
  n: number;
  date: string;
  note: string;
  total: number;
}

export interface InvoiceActivity {
  label: string;
  date?: string;
  pending?: boolean;
}

import type { Customer } from './customer';
import type { Invoice, PaymentDetails } from './invoice';
import type { Receipt } from './payment';

export interface CompanyProfile {
  name: string;
  abn: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  tagline: string;
  markLabel: string;
}

export interface DocumentMetaItem {
  label: string;
  value: string;
}

export interface InvoiceDocumentProps {
  invoice: Invoice;
  customer?: Customer;
  company: CompanyProfile;
  paymentDetails?: PaymentDetails;
  returnPolicy?: string;
}

export interface ReceiptDocumentProps {
  receipt: Receipt;
  invoice: Invoice;
  customer?: Customer;
  company: CompanyProfile;
  receiptNumber?: string;
  confirmationMessage: string;
  fullyPaid?: boolean;
}

export type PaymentMethod = 'Bank Transfer' | 'Cash' | 'Card' | 'Other';
export type PaymentStatus = 'Paid';

export interface Payment {
  id: string;
  invoiceNumber: string;
  customerName: string;
  paymentDate: string;
  amount: number;
  method: PaymentMethod;
  reference: string;
  status: PaymentStatus;
}

export interface Receipt {
  id: string;
  invoiceNumber: string;
  customerName: string;
  date: string;
  amount: number;
  method: PaymentMethod;
}

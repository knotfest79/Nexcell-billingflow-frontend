export type CustomerStatus = 'Active' | 'Inactive';

export interface Customer {
  id: string;
  businessCode: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalInvoiced: number;
  outstanding: number;
  lastInvoice: string;
  status: CustomerStatus;
}

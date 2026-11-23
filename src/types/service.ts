export type BillingCycle = 'Project' | 'Annual' | 'Monthly' | 'Hourly';
export type TaxBehaviour = 'gst_inclusive' | 'gst_exclusive' | 'gst_free';

export interface Service {
  id: string;
  code: string;
  name: string;
  description?: string;
  defaultPrice: number;
  taxBehaviour: TaxBehaviour;
  billing: BillingCycle;
  invoices: number;
  active: boolean;
}

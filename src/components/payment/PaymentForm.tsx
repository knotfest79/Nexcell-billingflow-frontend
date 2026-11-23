import { getTodayISO } from '../../utils/date';
import { money } from '../../utils/format';
import type { Invoice } from '../../types/invoice';
import type { PaymentMethod } from '../../types/payment';

export interface PaymentFormValues {
  invoiceId: string;
  amount: string;
  paymentDate: string;
  method: PaymentMethod;
  reference: string;
}

export const emptyPaymentForm = (invoices: Invoice[]): PaymentFormValues => ({
  invoiceId: invoices[0]?.id ?? '',
  amount: String(invoices[0]?.balanceDue ?? 0),
  paymentDate: getTodayISO(),
  method: 'Bank Transfer',
  reference: '',
});

interface PaymentFormProps {
  values: PaymentFormValues;
  invoices: Invoice[];
  onChange: (values: PaymentFormValues) => void;
}

export function PaymentForm({ values, invoices, onChange }: PaymentFormProps) {
  const update = (patch: Partial<PaymentFormValues>) => onChange({ ...values, ...patch });
  const selected = invoices.find((invoice) => invoice.id === values.invoiceId);

  return (
    <div className="card-b">
      <div className="field"><label htmlFor="pi">Invoice</label><select id="pi" value={values.invoiceId} onChange={(event) => {
        const next = invoices.find((invoice) => invoice.id === event.target.value);
        update({ invoiceId: event.target.value, amount: String(next?.balanceDue ?? 0) });
      }}>
        {invoices.map((invoice) => <option key={invoice.id} value={invoice.id}>{invoice.invoiceNumber}</option>)}
      </select></div>
      <div className="form-grid">
        <div className="field"><label>Amount Due</label><input value={money(selected?.balanceDue ?? 0)} readOnly /></div>
        <div className="field"><label htmlFor="pa">Amount Paid</label><input id="pa" type="number" step="0.01" value={values.amount} onChange={(event) => update({ amount: event.target.value })} /></div>
      </div>
      <div className="form-grid">
        <div className="field"><label htmlFor="pd">Payment Date</label><input id="pd" type="date" value={values.paymentDate} onChange={(event) => update({ paymentDate: event.target.value })} /></div>
        <div className="field"><label htmlFor="pm">Payment Method</label><select id="pm" value={values.method} onChange={(event) => update({ method: event.target.value as PaymentMethod })}>
          <option>Bank Transfer</option><option>Cash</option><option>Card</option><option>Other</option>
        </select></div>
      </div>
      <div className="field"><label htmlFor="pr">Reference</label><input id="pr" value={values.reference} onChange={(event) => update({ reference: event.target.value })} /></div>
    </div>
  );
}

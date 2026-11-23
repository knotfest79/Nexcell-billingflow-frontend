import { Card, CardBody, CardHeader } from '../common/Card';
import { money } from '../../utils/format';

interface InvoiceTotalsProps {
  subtotal: number;
  discount?: number;
  tax: number;
  amountPaid?: number;
  balanceDue: number;
}

export function InvoiceTotals({ subtotal, discount = 0, tax, amountPaid = 0, balanceDue }: InvoiceTotalsProps) {
  return (
    <Card>
      <CardHeader><h2>Totals</h2></CardHeader>
      <CardBody>
        <div className="total-row"><span className="muted">Subtotal</span><span className="num">{money(subtotal)}</span></div>
        <div className="total-row"><span className="muted">Discount</span><span className="num">{money(discount)}</span></div>
        <div className="total-row"><span className="muted">GST</span><span className="num">{money(tax)}</span></div>
        <div className="total-row strong"><span>Total</span><span className="num">{money(subtotal + tax - discount)}</span></div>
        <div className="total-row"><span className="muted">Amount Paid</span><span className="num">{money(amountPaid)}</span></div>
        <div className="total-row strong" style={{ color: 'var(--accent)' }}><span>Balance Due</span><span className="num">{money(balanceDue)}</span></div>
        <p className="sm muted" style={{ marginTop: 12 }}>Billing works offline. Changes sync when you’re back online.</p>
      </CardBody>
    </Card>
  );
}

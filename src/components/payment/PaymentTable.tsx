import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { money } from '../../utils/format';
import type { Payment } from '../../types/payment';
import { useToast } from '../../context/ToastContext';

export function PaymentTable({ payments }: { payments: Payment[] }) {
  return (
    <div className="table-wrap">
      <table className="stack">
        <thead>
          <tr>
            <th>Payment</th><th>Invoice</th><th>Customer</th><th>Payment Date</th>
            <th className="num">Amount</th><th>Method</th><th>Reference</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td data-l="Payment">{payment.id}</td>
              <td data-l="Invoice">{payment.invoiceNumber}</td>
              <td data-l="Customer">{payment.customerName}</td>
              <td data-l="Date">{payment.paymentDate}</td>
              <td data-l="Amount" className="num">{money(payment.amount)}</td>
              <td data-l="Method">{payment.method}</td>
              <td data-l="Reference">{payment.reference}</td>
              <td data-l="Status"><StatusBadge status={payment.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ReceiptTable({ receipts }: { receipts: { id: string; invoiceNumber: string; customerName: string; date: string; amount: number; method: string }[] }) {
  const { toast } = useToast();
  return (
    <div className="table-wrap">
      <table className="stack">
        <thead>
          <tr><th>Receipt</th><th>Original Invoice</th><th>Customer</th><th>Date</th><th className="num">Amount</th><th>Payment Method</th><th /></tr>
        </thead>
        <tbody>
          {receipts.map((receipt) => (
            <tr key={receipt.id}>
              <td data-l="Receipt">{receipt.id}</td>
              <td data-l="Invoice">{receipt.invoiceNumber}</td>
              <td data-l="Customer">{receipt.customerName}</td>
              <td data-l="Date">{receipt.date}</td>
              <td data-l="Amount" className="num">{money(receipt.amount)}</td>
              <td data-l="Method">{receipt.method}</td>
              <td>
                <Button variant="ghost" onClick={() => toast('Receipt opened')}>View</Button>
                <Button variant="ghost" onClick={() => toast('Downloaded')}>Download</Button>
                <Button variant="ghost" onClick={() => toast('Receipt emailed')}>Email</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { IconDropdown, MenuItem } from '../common/Dropdown';
import { useToast } from '../../context/ToastContext';
import { money } from '../../utils/format';
import type { Invoice } from '../../types/invoice';

interface InvoiceTableProps {
  invoices: Invoice[];
  variant?: 'recent' | 'full';
  customerName: (id: string) => string;
}

export function InvoiceTable({ invoices, variant = 'full', customerName }: InvoiceTableProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="table-wrap">
      <table className="stack">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Service</th>
            <th>{variant === 'recent' ? 'Date' : 'Invoice Date'}</th>
            {variant === 'full' && <th>Due Date</th>}
            <th className="num">Amount</th>
            {variant === 'full' && <th>Payment</th>}
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td data-l="Invoice" className="link" onClick={() => navigate(`/invoices/${invoice.id}`)}>{invoice.invoiceNumber}</td>
              <td data-l="Customer">{customerName(invoice.customerId)}</td>
              <td data-l="Service">{invoice.serviceName}</td>
              <td data-l="Date">{invoice.invoiceDate}</td>
              {variant === 'full' && <td data-l="Due Date">{invoice.dueDate}</td>}
              <td data-l="Amount" className="num">{money(invoice.total)}</td>
              {variant === 'full' && <td data-l="Payment">{invoice.status === 'paid' ? 'Received' : 'Awaiting'}</td>}
              <td data-l="Status"><StatusBadge status={invoice.displayStatus} /></td>
              <td>
                <IconDropdown label="Actions">
                  <MenuItem onClick={() => navigate(`/invoices/${invoice.id}`)}>View</MenuItem>
                  <MenuItem onClick={() => navigate(`/invoices/${invoice.id}/edit`)}>Edit</MenuItem>
                  <MenuItem onClick={() => toast('Downloaded')}>Download</MenuItem>
                  <MenuItem onClick={() => toast('Invoice emailed')}>Email</MenuItem>
                </IconDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

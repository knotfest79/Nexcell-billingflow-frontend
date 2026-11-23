import { StatusBadge } from '../common/StatusBadge';
import type { Invoice } from '../../types/invoice';

export function InvoiceStatus({ invoice }: { invoice: Invoice }) {
  return <StatusBadge status={invoice.displayStatus} />;
}

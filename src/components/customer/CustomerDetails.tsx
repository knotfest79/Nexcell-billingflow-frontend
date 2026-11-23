import { Tabs } from '../common/Tabs';
import { money } from '../../utils/format';
import type { Customer } from '../../types/customer';
import type { Invoice } from '../../types/invoice';

interface CustomerDetailsProps {
  customer: Customer;
  invoices: Invoice[];
}

export function CustomerDetails({ customer, invoices }: CustomerDetailsProps) {
  const invoiceCount = invoices.filter((invoice) => invoice.customerId === customer.id).length;

  return (
    <>
      <p className="muted sm">{customer.email} · {customer.phone}<br />Business code {customer.businessCode}</p>
      <div className="kv mt" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div><span>Invoiced</span><b>{money(customer.totalInvoiced)}</b></div>
        <div><span>Outstanding</span><b>{money(customer.outstanding)}</b></div>
        <div><span>Invoices</span><b>{invoiceCount}</b></div>
      </div>
      <Tabs items={['Invoices', 'Payments', 'Notes', 'Activity']} />
      <p className="muted sm mt">Mock content for the selected section.</p>
    </>
  );
}

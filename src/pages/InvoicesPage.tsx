import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { EmptyState } from '../components/common/EmptyState';
import { SearchInput } from '../components/common/SearchInput';
import { InvoiceTable } from '../components/invoice/InvoiceTable';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

export function InvoicesPage() {
  const { invoices, customers, getCustomer } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if ((location.state as { focusSearch?: boolean } | null)?.focusSearch) searchRef.current?.focus();
  }, [location.state]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return invoices.filter((invoice) => {
      const matchesStatus = !status || invoice.displayStatus === status;
      const haystack = `${invoice.invoiceNumber} ${getCustomer(invoice.customerId)?.name ?? ''} ${invoice.serviceName}`.toLowerCase();
      return matchesStatus && (!query || haystack.includes(query));
    });
  }, [invoices, customers, search, status, getCustomer]);

  return (
    <>
      <div className="page-head">
        <div><h1>Invoices</h1><p className="muted">Create, track and manage customer invoices.</p></div>
        <div className="row">
          <Button onClick={() => toast('Exported invoices.csv')}>Export</Button>
          <Button variant="primary" icon="plus" onClick={() => navigate('/invoices/new')}>New Invoice</Button>
        </div>
      </div>
      <Card>
        <div className="toolbar">
          <SearchInput inputRef={searchRef} value={search} onChange={setSearch} placeholder="Search invoice, customer or service" label="Search invoices" />
          <select aria-label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">Status</option><option>Paid</option><option>Unpaid</option><option>Overdue</option><option>Draft</option><option>Sent</option>
          </select>
          <select aria-label="Customer" defaultValue="Customer"><option>Customer</option></select>
          <select aria-label="Date" defaultValue="Date"><option>Date</option></select>
          <select aria-label="Service" defaultValue="Service"><option>Service</option></select>
        </div>
        <InvoiceTable invoices={filtered} customerName={(id) => getCustomer(id)?.name ?? id} />
        {filtered.length === 0 && (
          <EmptyState
            title="No invoices yet"
            description="Create your first invoice and BillingFlow will keep everything organised."
            action={<Button variant="primary" onClick={() => navigate('/invoices/new')}>Create Invoice</Button>}
          />
        )}
        <div className="pager">
          <span className="sm muted">Showing 1–{filtered.length} of {filtered.length}</span>
          <div className="row"><Button disabled>Previous</Button><Button disabled>Next</Button></div>
        </div>
      </Card>
    </>
  );
}

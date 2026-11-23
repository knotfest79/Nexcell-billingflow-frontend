import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { EmptyState } from '../components/common/EmptyState';
import { Dropdown, MenuItem } from '../components/common/Dropdown';
import { StatusBadge } from '../components/common/StatusBadge';
import { InvoiceRevisionHistory } from '../components/invoice/InvoiceRevisionHistory';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';
import { invoiceActivity } from '../data/mockData';
import { formatDisplayDate } from '../utils/date';
import { money } from '../utils/format';

export function InvoiceDetailsPage() {
  const { invoiceId } = useParams();
  const { getInvoice, getCustomer, revisions } = useData();
  const { openModal } = useModal();
  const { toast } = useToast();
  const navigate = useNavigate();
  const invoice = getInvoice(invoiceId ?? '');

  if (!invoice) {
    return <EmptyState title="Invoice not found" description="This invoice is not available in the current mock data." />;
  }

  return (
    <>
      <div className="page-head">
        <div>
          <div className="row"><h1>{invoice.invoiceNumber}</h1><StatusBadge status={invoice.displayStatus} /></div>
          <p className="muted">{getCustomer(invoice.customerId)?.name ?? ''} · {invoice.serviceName}</p>
        </div>
        <div className="row">
          <Button onClick={() => toast('Opening PDF', 'info')}>View PDF</Button>
          <Button onClick={() => toast('Downloaded')}>Download</Button>
          <Button onClick={() => toast('Invoice emailed')}>Email Invoice</Button>
          <Button onClick={() => toast('Reminder sent')}>Send Reminder</Button>
          <Button variant="primary" onClick={() => openModal('payment', { invoiceId: invoice.id })}>Record Payment</Button>
          <Dropdown trigger={<Button>More</Button>}>
            <MenuItem onClick={() => toast('Receipt created')}>Create Receipt</MenuItem>
            <MenuItem onClick={() => navigate(`/invoices/${invoice.id}/edit`)}>Edit Invoice</MenuItem>
          </Dropdown>
        </div>
      </div>

      <div className="grid g2">
        <div className="grid">
          <Card>
            <CardBody className="kv">
              <div><span>Total</span><b className="big">{money(invoice.total)}</b></div>
              <div><span>Balance</span><b className="big">{money(invoice.balanceDue)}</b></div>
              <div><span>Invoice Date</span><b>{formatDisplayDate(invoice.invoiceDate)}</b></div>
              <div><span>Due Date</span><b>{formatDisplayDate(invoice.dueDate)}</b></div>
            </CardBody>
          </Card>
          <div className="alert warn"><b>Existing invoices are protected.</b><p className="sm">Edits are saved as new revisions so the original is always preserved.</p></div>
          <InvoiceRevisionHistory revisions={revisions} />
        </div>
        <Card>
          <CardHeader><h2>Activity</h2></CardHeader>
          <CardBody>
            <ul className="timeline">
              {invoiceActivity.map((activity) => (
                <li key={activity.label} className={activity.pending ? 'pending' : ''}>
                  <b>{activity.label}</b>
                  {activity.date && <div className="sm muted">{activity.date}</div>}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { EmptyState } from '../components/common/EmptyState';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';
import { formatDisplayDate, getTodayISO } from '../utils/date';
import { money } from '../utils/format';

export function EditInvoicePage() {
  const { invoiceId } = useParams();
  const { getInvoice, getCustomer, revisions, addRevision } = useData();
  const { openModal } = useModal();
  const { toast } = useToast();
  const navigate = useNavigate();
  const invoice = getInvoice(invoiceId ?? '');

  const originalRate = invoice?.items[0]?.unitPrice ?? 300;
  const [dueDate, setDueDate] = useState(invoice?.dueDate ?? '');
  const [rate, setRate] = useState(String(originalRate));
  const [note, setNote] = useState('');
  const [reason, setReason] = useState('');

  const diff = useMemo(() => {
    if (!invoice) return [];
    const rows: { label: string; before: string; after: string }[] = [];
    if (dueDate && dueDate !== invoice.dueDate) rows.push({ label: 'Due Date', before: formatDisplayDate(invoice.dueDate), after: formatDisplayDate(dueDate) });
    const nextRate = Number(rate) || 0;
    if (nextRate !== originalRate) {
      rows.push({ label: 'Rate', before: money(originalRate), after: money(nextRate) });
      rows.push({ label: 'Total', before: money(invoice.total), after: money(invoice.total - originalRate + nextRate) });
    }
    if (note) rows.push({ label: 'Customer note', before: 'none', after: 'added' });
    return rows;
  }, [invoice, dueDate, rate, note, originalRate]);

  if (!invoice) {
    return <EmptyState title="Invoice not found" description="This invoice is not available in the current mock data." />;
  }

  const nextRevision = revisions.length + 1;

  return (
    <>
      <div className="page-head">
        <div>
          <div className="row"><h1>Edit Existing Invoice</h1><Badge>{invoice.invoiceNumber}</Badge><Badge>{`Revision ${nextRevision} draft`}</Badge></div>
          <p className="muted">{invoice.invoiceNumber} · Changes are saved as a new revision. The original invoice is preserved.</p>
        </div>
        <div className="row sticky-act">
          <Button onClick={() => navigate(`/invoices/${invoice.id}`)}>Cancel</Button>
          <Button onClick={() => toast('Preview opened (demo)', 'info')}>Preview Changes</Button>
          <Button variant="primary" onClick={() => {
            if (!reason.trim()) {
              toast('Add a reason for this revision', 'warning');
              return;
            }
            openModal('confirmUpdate', {
              invoiceId: invoice.id,
              invoiceNumber: invoice.invoiceNumber,
              onConfirm: () => {
                addRevision({ n: nextRevision, date: formatDisplayDate(getTodayISO()), note: reason, total: invoice.total - originalRate + (Number(rate) || 0) });
                toast(`Revision ${nextRevision} saved. Original preserved.`);
                navigate(`/invoices/${invoice.id}`);
              },
            });
          }}>Update Invoice</Button>
        </div>
      </div>

      <div className="alert warn"><b>You are modifying an existing invoice.</b><p className="sm">Changes will eventually be recorded in revision history.</p></div>

      <div className="invoice-layout">
        <div className="grid">
          <Card>
            <CardHeader><h2>Locked details</h2><Badge>Locked</Badge></CardHeader>
            <CardBody className="form-grid">
              <div className="field"><label>Invoice Number</label><input value={invoice.invoiceNumber} readOnly /></div>
              <div className="field"><label>Customer</label><input value={getCustomer(invoice.customerId)?.name ?? ''} readOnly /></div>
              <div className="field"><label>Invoice Date</label><input value={formatDisplayDate(invoice.invoiceDate)} readOnly /></div>
              <div className="field"><label>Service Code</label><input value={invoice.serviceCode} readOnly /></div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader><h2>Editable details</h2></CardHeader>
            <CardBody className="form-grid">
              <div className="field"><label htmlFor="eDue">Due Date</label><input id="eDue" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></div>
              <div className="field"><label htmlFor="eRate">Hosting &amp; maintenance rate</label><input id="eRate" type="number" step="0.01" value={rate} onChange={(event) => setRate(event.target.value)} /></div>
              <div className="field" style={{ gridColumn: '1/-1' }}><label htmlFor="eNote">Customer note</label><textarea id="eNote" rows={2} value={note} onChange={(event) => setNote(event.target.value)} /></div>
              <div className="field" style={{ gridColumn: '1/-1' }}><label htmlFor="eReason">Reason for revision (required)</label><input id="eReason" placeholder="e.g. Rate corrected after quote change" value={reason} onChange={(event) => setReason(event.target.value)} /></div>
            </CardBody>
          </Card>
        </div>
        <Card className="prev-card">
          <CardHeader><h2>Changes in this revision</h2></CardHeader>
          <CardBody>
            {diff.length ? diff.map((row) => (
              <div className="diff" key={row.label}>
                <span className="muted">{row.label}</span>
                <span><s className="muted">{row.before}</s> → <b>{row.after}</b></span>
              </div>
            )) : <p className="muted sm">No changes yet. Edit a field to see what will change.</p>}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

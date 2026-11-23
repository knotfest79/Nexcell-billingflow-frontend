import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../common/Card';
import { Button } from '../common/Button';
import { CustomerSelector } from '../customer/CustomerSelector';
import { InvoiceDetails, type InvoiceDetailsValues } from './InvoiceDetails';
import { InvoiceItems } from './InvoiceItems';
import { InvoiceTotals } from './InvoiceTotals';
import type { Customer } from '../../types/customer';
import type { InvoiceDraft } from '../../types/invoice';
import type { Service } from '../../types/service';

interface InvoiceFormProps {
  draft: InvoiceDraft;
  invoiceNumberPreview: string;
  customers: Customer[];
  services: Service[];
  backdated: boolean;
  onChange: (patch: Partial<InvoiceDraft>) => void;
  onAddCustomer: () => void;
}

export function InvoiceForm({ draft, invoiceNumberPreview, customers, services, backdated, onChange, onAddCustomer }: InvoiceFormProps) {
  const [showPayment, setShowPayment] = useState(true);
  const subtotal = draft.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const details: InvoiceDetailsValues = {
    invoiceDate: draft.invoiceDate,
    dueDate: draft.dueDate,
    serviceId: draft.serviceId,
    currency: draft.currency,
    backdatedReason: draft.backdatedReason,
    backdatedConfirmed: draft.backdatedConfirmed,
  };

  const changeDetails = (patch: Partial<InvoiceDetailsValues>) => onChange(patch);

  return (
    <div className="grid">
      <CustomerSelector customers={customers} value={draft.customerId} onChange={(customerId) => onChange({ customerId })} onAddCustomer={onAddCustomer} />
      <InvoiceDetails
        values={details}
        invoiceNumberPreview={invoiceNumberPreview}
        serviceCode={services.find((service) => service.id === draft.serviceId)?.code ?? ''}
        services={services}
        backdated={backdated}
        onChange={changeDetails}
      />
      <InvoiceItems items={draft.items} onChange={(items) => onChange({ items })} />
      <Card>
        <CardHeader>
          <h2>Payment Details</h2>
          <Button variant="ghost" aria-expanded={showPayment} onClick={() => setShowPayment((current) => !current)}>
            {showPayment ? 'Hide' : 'Show'}
          </Button>
        </CardHeader>
        <CardBody className="form-grid" >
          <div style={{ display: showPayment ? 'contents' : 'none' }}>
            <div><span className="sm muted">Bank Name</span><br /><b>{draft.paymentDetails.bankName}</b></div>
            <div><span className="sm muted">Account Name</span><br /><b>{draft.paymentDetails.accountName}</b></div>
            <div><span className="sm muted">BSB</span><br /><b>{draft.paymentDetails.bsb}</b></div>
            <div><span className="sm muted">Account Number</span><br /><b className="masked">{draft.paymentDetails.accountNumber}</b></div>
          </div>
        </CardBody>
      </Card>
      <InvoiceTotals subtotal={subtotal} tax={0} balanceDue={subtotal} />
      <Card>
        <CardBody className="form-grid">
          <div className="field">
            <label htmlFor="cn">Customer Notes</label>
            <textarea id="cn" rows={3} placeholder="Appears on the invoice" value={draft.notes} onChange={(event) => onChange({ notes: event.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="in">Internal Notes</label>
            <textarea id="in" rows={3} placeholder="Private – never shown to the customer" value={draft.internalNotes} onChange={(event) => onChange({ internalNotes: event.target.value })} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

import { Card, CardBody, CardHeader } from '../common/Card';
import { Badge } from '../common/StatusBadge';
import { ServiceSelector } from '../service/ServiceSelector';
import type { Service } from '../../types/service';

export interface InvoiceDetailsValues {
  invoiceDate: string;
  dueDate: string;
  serviceId: string;
  currency: string;
  backdatedReason: string;
  backdatedConfirmed: boolean;
}

interface InvoiceDetailsProps {
  values: InvoiceDetailsValues;
  invoiceNumberPreview: string;
  serviceCode: string;
  services: Service[];
  backdated: boolean;
  onChange: (patch: Partial<InvoiceDetailsValues>) => void;
}

export function InvoiceDetails({ values, invoiceNumberPreview, serviceCode, services, backdated, onChange }: InvoiceDetailsProps) {
  return (
    <Card>
      <CardHeader><h2>Invoice Details</h2></CardHeader>
      <CardBody>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="invNo">Invoice Number</label>
            {/*
              PREVIEW ONLY. This browser-generated number is derived from date,
              business code and service code. The backend will later become
              authoritative for final invoice-number generation and duplicate
              validation, so this value must never be treated as final.
            */}
            <input id="invNo" value={invoiceNumberPreview} readOnly />
            <span className="sm muted">Generated automatically</span>
          </div>
          <div className="field">
            <label htmlFor="invDate">Invoice Date {!backdated && <Badge>Today</Badge>}</label>
            <input
              id="invDate"
              type="date"
              value={values.invoiceDate}
              onChange={(event) => onChange({ invoiceDate: event.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={values.dueDate}
              onChange={(event) => onChange({ dueDate: event.target.value })}
            />
          </div>
          <ServiceSelector services={services} value={values.serviceId} onChange={(serviceId) => onChange({ serviceId })} />
          <div className="field">
            <label htmlFor="svcCode">Service Code</label>
            <input id="svcCode" value={serviceCode} readOnly />
          </div>
          <div className="field">
            <label>Currency</label>
            <select value={values.currency} onChange={(event) => onChange({ currency: event.target.value })}>
              <option>AUD</option>
              <option>USD</option>
              <option>NZD</option>
            </select>
          </div>
        </div>
        {backdated && (
          <div className="alert warn">
            <b>Backdated invoice</b>
            <p className="sm">This invoice date is earlier than today.</p>
            <label className="row sm" style={{ margin: '8px 0' }}>
              <input
                type="checkbox"
                checked={values.backdatedConfirmed}
                onChange={(event) => onChange({ backdatedConfirmed: event.target.checked })}
              />
              I understand and want to create a backdated invoice.
            </label>
            <input
              placeholder="Reason for backdating"
              aria-label="Reason for backdating"
              value={values.backdatedReason}
              onChange={(event) => onChange({ backdatedReason: event.target.value })}
            />
          </div>
        )}
      </CardBody>
    </Card>
  );
}

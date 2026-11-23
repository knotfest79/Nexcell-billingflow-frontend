import { Card, CardBody, CardHeader } from '../common/Card';
import { Badge } from '../common/StatusBadge';
import { DocumentPrintFrame } from '../documents/DocumentPrintFrame';
import { InvoiceDocument } from '../documents/InvoiceDocument';
import { NEXCELL_COMPANY, NEXCELL_RETURN_POLICY } from '../../data/documentDefaults';
import type { Customer } from '../../types/customer';
import type { Invoice, InvoiceItem, PaymentDetails } from '../../types/invoice';
import type { CompanyProfile } from '../../types/documents';

interface InvoicePreviewProps {
  customer?: Customer;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax?: number;
  discount?: number;
  total?: number;
  currency?: string;
  notes?: string;
  backdated: boolean;
  paymentDetails: PaymentDetails;
  company?: CompanyProfile;
  returnPolicy?: string;
}

export function InvoicePreview({
  customer,
  invoiceNumber,
  invoiceDate,
  dueDate,
  items,
  subtotal,
  tax = 0,
  discount = 0,
  total,
  currency = 'AUD',
  notes,
  backdated,
  paymentDetails,
  company = NEXCELL_COMPANY,
  returnPolicy = NEXCELL_RETURN_POLICY,
}: InvoicePreviewProps) {
  const resolvedTotal = total ?? subtotal + tax - discount;
  const invoice: Invoice = {
    id: invoiceNumber.replace(/^#/, ''),
    invoiceNumber,
    customerId: customer?.id ?? '',
    businessCode: customer?.businessCode ?? '',
    serviceCode: '',
    serviceName: '',
    invoiceDate,
    dueDate,
    status: 'draft',
    displayStatus: 'Draft',
    items,
    subtotal,
    tax,
    discount,
    total: resolvedTotal,
    amountPaid: 0,
    balanceDue: resolvedTotal,
    currency,
    notes,
    internalNotes: '',
    paymentDetails,
  };

  return (
    <Card className="prev-card">
      <CardHeader>
        <h2>Live preview</h2>
        {backdated ? <Badge>Backdated</Badge> : <Badge>Updates as you type</Badge>}
      </CardHeader>
      <CardBody>
        <DocumentPrintFrame>
          <InvoiceDocument
            invoice={invoice}
            customer={customer}
            company={company}
            returnPolicy={returnPolicy}
          />
        </DocumentPrintFrame>
      </CardBody>
    </Card>
  );
}

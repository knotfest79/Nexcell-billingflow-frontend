import { DocumentBrandHeader } from './DocumentBrandHeader';
import { DocumentFooter } from './DocumentFooter';
import { DocumentItemTable } from './DocumentItemTable';
import type { ReceiptDocumentProps } from '../../types/documents';
import { formatDocumentDate } from '../../utils/document';
import { money } from '../../utils/format';

export function ReceiptDocument({
  receipt,
  invoice,
  customer,
  company,
  receiptNumber,
  confirmationMessage,
  fullyPaid,
}: ReceiptDocumentProps) {
  const paid = fullyPaid ?? invoice.balanceDue <= 0;

  return (
    <article className="document-page document-page--receipt" aria-label={`Receipt ${receipt.id}`}>
      <DocumentBrandHeader
        variant="receipt"
        title="PAID RECEIPT"
        tone="green"
        meta={[
          { label: 'Receipt No', value: receiptNumber ?? `#${receipt.id}` },
          { label: 'Invoice Date', value: formatDocumentDate(invoice.invoiceDate) },
          { label: 'Payment Date', value: formatDocumentDate(receipt.date) },
          { label: 'Payment Method', value: receipt.method },
        ]}
        badge={<span className="doc-received-badge">Payment Received</span>}
      />

      <section className="doc-received-from">
        <h2>Received From</h2>
        <div className="doc-received-from__name">{customer?.name ?? receipt.customerName}</div>
        {customer?.address && <div>{customer.address}</div>}
        {customer?.email && <div>{customer.email}</div>}
        {customer?.phone && <div>{customer.phone}</div>}
      </section>

      <DocumentItemTable items={invoice.items} variant="receipt" />

      <section className="doc-receipt-totals">
        <div className="doc-receipt-totals__row"><span>Invoice Total:</span><span>{money(invoice.total)}</span></div>
        <div className="doc-receipt-totals__row"><span>Amount Paid:</span><span>{money(receipt.amount)}</span></div>
        <div className={`doc-receipt-totals__row doc-receipt-totals__balance ${paid ? 'is-paid' : 'is-partial'}`}>
          <span>Balance Due:</span><span>{money(invoice.balanceDue)}</span>
        </div>
      </section>

      <section className="doc-confirmation">{confirmationMessage}</section>

      <DocumentFooter company={company} variant="receipt" />
    </article>
  );
}

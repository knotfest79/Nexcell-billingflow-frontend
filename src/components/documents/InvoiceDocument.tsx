import { DocumentBrandHeader } from './DocumentBrandHeader';
import { DocumentFooter } from './DocumentFooter';
import { DocumentItemTable } from './DocumentItemTable';
import type { InvoiceDocumentProps } from '../../types/documents';
import { formatDocumentDate } from '../../utils/document';
import { money } from '../../utils/format';

export function InvoiceDocument({
  invoice,
  customer,
  company,
  paymentDetails,
  returnPolicy,
}: InvoiceDocumentProps) {
  const pay = paymentDetails ?? invoice.paymentDetails;
  const note = invoice.notes?.trim();

  return (
    <>
      <article className="document-page document-page--invoice" aria-label={`Invoice ${invoice.invoiceNumber}`}>
        <DocumentBrandHeader
          title="INVOICE"
          identifier={invoice.invoiceNumber}
          meta={[
            { label: 'Invoice Date', value: formatDocumentDate(invoice.invoiceDate) },
            { label: 'Due Date', value: formatDocumentDate(invoice.dueDate) },
          ]}
        />

        <section className="doc-parties">
          <div>
            <div className="doc-parties__name">{company.name}</div>
            <div>ABN: {company.abn}</div>
            <div className="doc-parties__spacer">{company.address}</div>
            <div>{company.email}</div>
            <div>{company.phone}</div>
            <div>{company.website}</div>
          </div>
          <div>
            <div className="doc-parties__name">Bill To:</div>
            <div>{customer?.name ?? invoice.businessCode}</div>
            <div className="doc-parties__spacer">{customer?.address}</div>
            <div>{customer?.email}</div>
            <div>{customer?.phone}</div>
          </div>
        </section>

        <DocumentItemTable items={invoice.items} variant="invoice" />

        <div className="doc-final-block">
          <section className="doc-payment-totals">
            <div className="doc-payment-info">
              <h2>Payment Information</h2>
              <dl>
                <div><dt>Bank Name:</dt><dd>{pay.bankName}</dd></div>
                <div><dt>Account Name:</dt><dd>{pay.accountName}</dd></div>
                <div><dt>Account Number:</dt><dd>{pay.accountNumber}</dd></div>
                <div><dt>BSB:</dt><dd>{pay.bsb}</dd></div>
              </dl>
            </div>
            <div className="doc-totals">
              <div className="doc-totals__row"><span>Subtotal</span><span>{money(invoice.subtotal)}</span></div>
              {invoice.tax > 0 && (
                <div className="doc-totals__row"><span>Tax/GST</span><span>{money(invoice.tax)}</span></div>
              )}
              {invoice.discount > 0 && (
                <div className="doc-totals__row"><span>Discount</span><span>-{money(invoice.discount)}</span></div>
              )}
              <div className="doc-totals__row doc-totals__total"><span>Total</span><span>{money(invoice.total)}</span></div>
              <div className="doc-totals__due">
                <span>Amount Due</span>
                <strong>{money(invoice.balanceDue)}</strong>
              </div>
            </div>
          </section>

          <div className="doc-thanks">Thank you for your business!</div>

          {note && <section className="doc-notes"><b>Notes</b><p>{note}</p></section>}

          <DocumentFooter company={company} variant="invoice" />
        </div>
      </article>

      {returnPolicy && (
        <article className="document-page document-page--continuation" aria-label="Return policy">
          <section className="doc-return-policy">
            <h2>RETURN POLICY</h2>
            <p>{returnPolicy}</p>
          </section>
        </article>
      )}
    </>
  );
}

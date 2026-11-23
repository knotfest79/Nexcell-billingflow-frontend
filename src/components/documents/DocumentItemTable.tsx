import type { InvoiceItem } from '../../types/invoice';
import { money } from '../../utils/format';

interface DocumentItemTableProps {
  items: InvoiceItem[];
  variant?: 'invoice' | 'receipt';
}

export function DocumentItemTable({ items, variant = 'invoice' }: DocumentItemTableProps) {
  return (
    <table className={`doc-items doc-items--${variant}`}>
      <colgroup>
        <col className="doc-col-no" />
        <col className="doc-col-description" />
        <col className="doc-col-qty" />
        <col className="doc-col-price" />
        <col className="doc-col-amount" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Description</th>
          <th scope="col" className="doc-num">Qty</th>
          <th scope="col" className="doc-num">Unit Price</th>
          <th scope="col" className="doc-num">Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id}>
            <td className="doc-num">{index + 1}</td>
            <td>
              <div className="doc-item-description">{item.description}</div>
              {item.details && <div className="doc-item-details">{item.details}</div>}
            </td>
            <td className="doc-num">{item.qty}</td>
            <td className="doc-num">{money(item.unitPrice)}</td>
            <td className="doc-num">{money(item.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

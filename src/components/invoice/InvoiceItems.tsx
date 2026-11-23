import { Button } from '../common/Button';
import { Card, CardHeader } from '../common/Card';
import { money } from '../../utils/format';
import type { InvoiceItem } from '../../types/invoice';

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onChange: (items: InvoiceItem[]) => void;
}

export function InvoiceItems({ items, onChange }: InvoiceItemsProps) {
  const update = (id: string, patch: Partial<InvoiceItem>) => {
    onChange(items.map((item) => item.id === id ? { ...item, ...patch } : item));
  };

  return (
    <Card>
      <CardHeader>
        <h2>Invoice Items</h2>
        <Button icon="plus" onClick={() => onChange([...items, {
          id: `item-${Date.now()}`,
          description: 'New item',
          details: 'Details',
          qty: 1,
          unitPrice: 50,
          amount: 50,
        }])}>Add Item</Button>
      </CardHeader>
      <div className="table-wrap">
        <table className="items">
          <thead>
            <tr><th>Description</th><th>Details</th><th>Qty</th><th>Rate</th><th className="num">Amount</th><th /></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td><input aria-label="Description" value={item.description} onChange={(event) => update(item.id, { description: event.target.value })} /></td>
                <td><input aria-label="Details" value={item.details ?? ''} onChange={(event) => update(item.id, { details: event.target.value })} /></td>
                <td><input type="number" min="0" aria-label="Qty" value={item.qty} onChange={(event) => update(item.id, { qty: Number(event.target.value) || 0 })} /></td>
                <td><input type="number" min="0" step="0.01" aria-label="Rate" value={item.unitPrice} onChange={(event) => update(item.id, { unitPrice: Number(event.target.value) || 0 })} /></td>
                <td className="num amt">{money(item.qty * item.unitPrice)}</td>
                <td><Button iconOnly variant="ghost" icon="x" aria-label="Remove item" onClick={() => onChange(items.filter((row) => row.id !== item.id))} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

import { Button } from '../common/Button';
import { Card, CardBody, CardHeader } from '../common/Card';
import { Badge } from '../common/StatusBadge';
import type { Customer } from '../../types/customer';

interface CustomerSelectorProps {
  customers: Customer[];
  value: string;
  onChange: (customerId: string) => void;
  onAddCustomer: () => void;
}

export function CustomerSelector({ customers, value, onChange, onAddCustomer }: CustomerSelectorProps) {
  const selected = customers.find((customer) => customer.id === value) ?? customers[0];

  return (
    <Card>
      <CardHeader>
        <h2>Customer</h2>
        <Button variant="ghost" onClick={onAddCustomer}>+ Add New Customer</Button>
      </CardHeader>
      <CardBody>
        <div className="field">
          <label htmlFor="cust">Search or select customer</label>
          <select id="cust" value={selected?.id ?? ''} onChange={(event) => onChange(event.target.value)}>
            {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
          </select>
        </div>
        {selected && (
          <div className="cust">
            <b>{selected.name}</b>
            <div className="sm muted">{selected.address}<br />{selected.email} · {selected.phone}</div>
            <Badge style={{ marginTop: 6 }}>Business code: {selected.businessCode}</Badge>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

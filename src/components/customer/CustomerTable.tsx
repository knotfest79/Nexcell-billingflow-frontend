import { useNavigate } from 'react-router-dom';
import { Badge, StatusBadge } from '../common/StatusBadge';
import { money } from '../../utils/format';
import type { Customer } from '../../types/customer';

export function CustomerTable({ customers }: { customers: Customer[] }) {
  const navigate = useNavigate();

  return (
    <div className="table-wrap">
      <table className="stack">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Business Code</th>
            <th>Email</th>
            <th>Phone</th>
            <th className="num">Total Invoiced</th>
            <th className="num">Outstanding</th>
            <th>Last Invoice</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/customers/${customer.id}`)}>
              <td data-l="Customer"><b>{customer.name}</b></td>
              <td data-l="Code"><Badge>{customer.businessCode}</Badge></td>
              <td data-l="Email">{customer.email}</td>
              <td data-l="Phone">{customer.phone}</td>
              <td data-l="Invoiced" className="num">{money(customer.totalInvoiced)}</td>
              <td data-l="Outstanding" className="num">{money(customer.outstanding)}</td>
              <td data-l="Last Invoice">{customer.lastInvoice}</td>
              <td data-l="Status"><StatusBadge status={customer.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Badge, StatusBadge } from '../common/StatusBadge';
import { money } from '../../utils/format';
import type { Service } from '../../types/service';

export function ServiceTable({ services }: { services: Service[] }) {
  return (
    <div className="table-wrap">
      <table className="stack">
        <thead>
          <tr>
            <th>Service</th>
            <th>Code</th>
            <th className="num">Default rate</th>
            <th>Billing</th>
            <th className="num">Invoices</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td data-l="Service"><b>{service.name}</b></td>
              <td data-l="Code"><Badge>{service.code}</Badge></td>
              <td data-l="Rate" className="num">{money(service.defaultPrice)}</td>
              <td data-l="Billing">{service.billing}</td>
              <td data-l="Invoices" className="num">{service.invoices}</td>
              <td data-l="Status"><StatusBadge status={service.active ? 'Active' : 'Draft'} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

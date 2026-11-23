import type { Service } from '../../types/service';

interface ServiceSelectorProps {
  services: Service[];
  value: string;
  onChange: (serviceId: string) => void;
}

export function ServiceSelector({ services, value, onChange }: ServiceSelectorProps) {
  const available = services.filter((service) => service.active);
  return (
    <div className="field">
      <label htmlFor="svc">Service</label>
      <select id="svc" value={value} onChange={(event) => onChange(event.target.value)}>
        {available.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
      </select>
    </div>
  );
}

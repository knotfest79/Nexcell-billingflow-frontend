import type { Service } from '../../types/service';

export interface ServiceFormValues {
  name: string;
  code: string;
  defaultPrice: string;
  billing: Service['billing'];
}

export const emptyServiceForm: ServiceFormValues = {
  name: '',
  code: '',
  defaultPrice: '',
  billing: 'Project',
};

interface ServiceFormProps {
  values: ServiceFormValues;
  onChange: (values: ServiceFormValues) => void;
}

export function ServiceForm({ values, onChange }: ServiceFormProps) {
  const update = (patch: Partial<ServiceFormValues>) => onChange({ ...values, ...patch });

  return (
    <div className="card-b">
      <div className="field"><label htmlFor="sName">Service name</label><input id="sName" value={values.name} onChange={(event) => update({
        name: event.target.value,
        code: event.target.value.replace(/[^a-z]/gi, '').slice(0, 3).toUpperCase(),
      })} /></div>
      <div className="form-grid">
        <div className="field"><label htmlFor="sCode">Service code</label><input id="sCode" maxLength={4} value={values.code} onChange={(event) => update({ code: event.target.value })} /></div>
        <div className="field"><label htmlFor="sRate">Default rate (AUD)</label><input id="sRate" type="number" step="0.01" value={values.defaultPrice} onChange={(event) => update({ defaultPrice: event.target.value })} /></div>
      </div>
      <div className="field"><label htmlFor="sBill">Billing</label><select id="sBill" value={values.billing} onChange={(event) => update({ billing: event.target.value as Service['billing'] })}>
        <option>Project</option><option>Annual</option><option>Monthly</option><option>Hourly</option>
      </select></div>
    </div>
  );
}

export interface CustomerFormValues {
  name: string;
  businessCode: string;
  email: string;
  phone: string;
  address: string;
}

export const emptyCustomerForm: CustomerFormValues = {
  name: '',
  businessCode: '',
  email: '',
  phone: '',
  address: '',
};

interface CustomerFormProps {
  values: CustomerFormValues;
  onChange: (values: CustomerFormValues) => void;
}

export function CustomerForm({ values, onChange }: CustomerFormProps) {
  const update = (patch: Partial<CustomerFormValues>) => onChange({ ...values, ...patch });

  return (
    <div className="card-b">
      <div className="field"><label htmlFor="cName">Business name</label><input id="cName" value={values.name} onChange={(event) => update({
        name: event.target.value,
        businessCode: event.target.value.replace(/[^a-z]/gi, '').slice(0, 3).toUpperCase(),
      })} /></div>
      <div className="form-grid">
        <div className="field"><label htmlFor="cCode">Business code</label><input id="cCode" maxLength={4} value={values.businessCode} onChange={(event) => update({ businessCode: event.target.value })} /></div>
        <div className="field"><label htmlFor="cPhone">Phone</label><input id="cPhone" value={values.phone} onChange={(event) => update({ phone: event.target.value })} /></div>
      </div>
      <div className="field"><label htmlFor="cEmail">Email</label><input id="cEmail" type="email" value={values.email} onChange={(event) => update({ email: event.target.value })} /></div>
      <div className="field"><label htmlFor="cAddr">Address</label><input id="cAddr" value={values.address} onChange={(event) => update({ address: event.target.value })} /></div>
    </div>
  );
}

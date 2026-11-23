import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ServiceTable } from '../components/service/ServiceTable';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';

export function ServicesPage() {
  const { services } = useData();
  const { openModal } = useModal();

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Services</h1>
          <p className="muted">Each service code becomes part of the invoice number. Different codes are separate invoices.</p>
        </div>
        <Button variant="primary" icon="plus" onClick={() => openModal('service')}>New Service</Button>
      </div>
      <Card><ServiceTable services={services} /></Card>
    </>
  );
}

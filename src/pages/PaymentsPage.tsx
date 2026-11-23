import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PaymentTable } from '../components/payment/PaymentTable';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';

export function PaymentsPage() {
  const { payments } = useData();
  const { openModal } = useModal();

  return (
    <>
      <div className="page-head">
        <div><h1>Payments</h1><p className="muted">Money received against invoices.</p></div>
        <Button variant="primary" icon="plus" onClick={() => openModal('payment')}>Record Payment</Button>
      </div>
      <Card><PaymentTable payments={payments} /></Card>
    </>
  );
}

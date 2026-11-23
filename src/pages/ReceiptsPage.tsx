import { Card } from '../components/common/Card';
import { ReceiptTable } from '../components/payment/PaymentTable';
import { useData } from '../context/DataContext';

export function ReceiptsPage() {
  const { receipts } = useData();
  return (
    <>
      <div className="page-head">
        <div><h1>Receipts</h1><p className="muted">Proof of payment for your customers.</p></div>
      </div>
      <Card><ReceiptTable receipts={receipts} /></Card>
    </>
  );
}

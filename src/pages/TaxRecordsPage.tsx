import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Tabs } from '../components/common/Tabs';
import { useToast } from '../context/ToastContext';

export function TaxRecordsPage() {
  const { toast } = useToast();
  return (
    <>
      <div className="page-head">
        <div><h1>Tax &amp; Records</h1><p className="muted">Keep clean records for your accountant.</p></div>
        <Tabs items={['This Month', 'Quarter', 'Financial Year', 'Custom']} />
      </div>
      <div className="grid g4">
        <Card className="stat"><div className="sm muted">Business Revenue</div><div className="big">$15,760.00</div></Card>
        <Card className="stat"><div className="sm muted">Tax Reserved</div><div className="big">$1,576.00</div></Card>
        <Card className="stat"><div className="sm muted">Business Expenses</div><div className="big">$3,210.00</div></Card>
        <Card className="stat"><div className="sm muted">Net Business Income</div><div className="big">$10,974.00</div></Card>
      </div>
      <div className="row mt">
        <Button variant="primary" onClick={() => toast('Accountant records exported')}>Export Accountant Records</Button>
        <Button onClick={() => toast('Excel exported')}>Export Excel</Button>
        <Button onClick={() => toast('CSV exported')}>Export CSV</Button>
        <Button onClick={() => toast('Summary downloaded')}>Download Summary</Button>
      </div>
      <p className="sm muted mt">BillingFlow assists with billing and business records. Tax treatment should be reviewed according to your business circumstances and accountant advice.</p>
    </>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { Icon } from '../components/common/Icon';
import { Toggle } from '../components/common/Toggle';
import { useToast } from '../context/ToastContext';

export function RemindersPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(true);
  const [third, setThird] = useState(false);

  return (
    <>
      <div className="page-head">
        <div><h1>Reminders</h1><p className="muted">Chase late payments without the awkwardness.</p></div>
      </div>
      <div className="grid g4">
        <Card className="stat"><div className="sm muted">Due Soon</div><div className="big">3</div></Card>
        <Card className="stat"><div className="sm muted">Overdue</div><div className="big">2</div></Card>
        <Card className="stat"><div className="sm muted">Reminder Sent</div><div className="big">5</div></Card>
        <Card className="stat"><div className="sm muted">Escalated</div><div className="big">1</div></Card>
      </div>
      <div className="grid g2 mt">
        <Card>
          <div className="list-row">
            <span className="ic d"><Icon name="bell" /></span>
            <div>
              <b>Eastern Sands Motel</b> <span className="muted">#830418-EST-WHM</span>
              <div className="sm muted">$556 outstanding · 12 days overdue</div>
            </div>
            <Button onClick={() => navigate('/invoices/830418-EST-WHM')}>View</Button>
            <Button variant="primary" onClick={() => toast('Reminder sent')}>Send Reminder</Button>
          </div>
        </Card>
        <Card>
          <CardHeader><h2>Automatic reminders</h2></CardHeader>
          <CardBody>
            <div className="srow">First reminder after 7 days<Toggle label="First reminder" checked={first} onChange={setFirst} /></div>
            <div className="srow">Second reminder after 14 days<Toggle label="Second reminder" checked={second} onChange={setSecond} /></div>
            <div className="srow">Final reminder after 30 days<Toggle label="Final reminder" checked={third} onChange={setThird} /></div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

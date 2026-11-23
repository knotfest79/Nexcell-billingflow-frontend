import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { Icon } from '../components/common/Icon';
import { Tabs } from '../components/common/Tabs';
import { InvoiceTable } from '../components/invoice/InvoiceTable';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { money } from '../utils/format';

export function DashboardPage() {
  const { invoices, getCustomer } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showMailAlert, setShowMailAlert] = useState(true);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Good morning, Pragesh</h1>
          <p className="muted">Here’s what’s happening with your business today.</p>
        </div>
        <Button variant="primary" icon="plus" onClick={() => navigate('/invoices/new')}>Create Invoice</Button>
      </div>

      {showMailAlert && (
        <div className="alert danger">
          <div><b>Invoice email failed</b><p className="sm">The invoice was saved successfully, but the email could not be sent.</p></div>
          <div className="row">
            <Button onClick={() => toast('Retrying email…', 'info')}>Retry</Button>
            <Button variant="ghost" onClick={() => setShowMailAlert(false)}>Dismiss</Button>
          </div>
        </div>
      )}

      <div className="grid g4">
        <Card className="stat"><div className="sm muted">Total Invoiced <Icon name="doc" /></div><div className="big">$18,450.00</div><div className="sm up">+12.4% this month</div></Card>
        <Card className="stat"><div className="sm muted">Total Paid <Icon name="card" /></div><div className="big">$15,760.00</div><div className="sm up">+8.1%</div></Card>
        <Card className="stat"><div className="sm muted">Outstanding <Icon name="clock" /></div><div className="big">{money(2690)}</div><div className="sm muted">4 invoices</div></Card>
        <Card className="stat"><div className="sm muted">Overdue <Icon name="bell" /></div><div className="big" style={{ color: 'var(--danger)' }}>{money(1120)}</div><div className="sm muted">2 invoices</div></Card>
      </div>

      <div className="grid g2 mt">
        <Card>
          <CardHeader>
            <h2>Cash Flow</h2>
            <div className="legend"><span><i style={{ background: 'var(--text-secondary)' }} />Invoiced</span><span><i style={{ background: 'var(--accent)' }} />Paid</span></div>
            <Tabs items={['7 Days', '30 Days', '3 Months', '12 Months']} initialIndex={1} />
          </CardHeader>
          <CardBody>
            <svg className="chart" viewBox="0 0 600 220" preserveAspectRatio="none" role="img" aria-label="Cash flow chart">
              <g stroke="var(--border)"><path d="M0 40H600M0 100H600M0 160H600" /></g>
              <path d="M0 150C60 120 90 140 150 100S250 90 300 80 420 110 470 60 560 50 600 40" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeDasharray="5 4" />
              <path d="M0 170C60 150 90 155 150 125S250 110 300 105 420 120 470 85 560 75 600 62V220H0Z" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
            </svg>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><h2>Needs Attention</h2></CardHeader>
          <div className="list-row" onClick={() => navigate('/invoices')}><span className="ic d"><Icon name="bell" /></span><div><b>2 overdue invoices</b><div className="sm muted">$1,120.00 awaiting payment</div></div><Icon name="chev" /></div>
          <div className="list-row" onClick={() => navigate('/invoices')}><span className="ic w"><Icon name="clock" /></span><div><b>3 invoices due this week</b><div className="sm muted">Total $1,570.00</div></div><Icon name="chev" /></div>
          <div className="list-row" onClick={() => navigate('/invoices/830418-EST-WHM')}><span className="ic d"><Icon name="mail" /></span><div><b>1 failed invoice email</b><div className="sm muted">#830418-EST-WHM</div></div><Icon name="chev" /></div>
          <div className="list-row" onClick={() => navigate('/reminders')}><span className="ic"><Icon name="bell" /></span><div><b>4 reminders ready to send</b><div className="sm muted">Review and send in one click</div></div><Icon name="chev" /></div>
        </Card>
      </div>

      <Card className="mt">
        <CardHeader><h2>Recent Invoices</h2><Button variant="ghost" onClick={() => navigate('/invoices')}>View all</Button></CardHeader>
        <InvoiceTable invoices={invoices.slice(0, 4)} variant="recent" customerName={(id) => getCustomer(id)?.name ?? id} />
      </Card>
    </>
  );
}

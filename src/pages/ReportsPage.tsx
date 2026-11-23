import { Bar } from '../components/common/Bar';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { money } from '../utils/format';
import { ageingRows, revenueBars, serviceRevenue, topCustomers } from '../data/mockData';

export function ReportsPage() {
  return (
    <>
      <div className="page-head">
        <div><h1>Reports</h1><p className="muted">Understand where your revenue comes from.</p></div>
      </div>
      <div className="grid g2">
        <Card>
          <CardHeader><h2>Revenue</h2></CardHeader>
          <CardBody>
            <svg className="chart" viewBox="0 0 600 220" preserveAspectRatio="none" role="img" aria-label="Revenue bars">
              <g fill="var(--accent)">
                {revenueBars.map((height, index) => (
                  <rect key={index} x={index * 50 + 8} y={220 - height} width="34" height={height} rx="3" />
                ))}
              </g>
            </svg>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><h2>Invoice Ageing</h2></CardHeader>
          <CardBody>
            {ageingRows.map((row) => <Bar key={row.label} label={row.label} display={row.display} width={row.width} />)}
          </CardBody>
        </Card>
      </div>
      <div className="grid g3 mt">
        <Card>
          <CardHeader><h2>Top Customers</h2></CardHeader>
          <CardBody>
            {topCustomers.map((row) => <Bar key={row.label} label={row.label} display={money(row.amount)} width={row.width} />)}
          </CardBody>
        </Card>
        <Card>
          <CardHeader><h2>Service Revenue</h2></CardHeader>
          <CardBody>
            {serviceRevenue.map((row) => <Bar key={row.label} label={row.label} display={money(row.amount)} width={row.width} />)}
          </CardBody>
        </Card>
        <Card>
          <CardHeader><h2>Outstanding</h2></CardHeader>
          <CardBody><div className="big">{money(2690)}</div><p className="sm muted">across 4 invoices</p></CardBody>
        </Card>
      </div>
    </>
  );
}

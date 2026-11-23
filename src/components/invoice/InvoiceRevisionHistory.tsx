import { Card, CardBody, CardHeader } from '../common/Card';
import { Badge } from '../common/StatusBadge';
import { money } from '../../utils/format';
import type { InvoiceRevision } from '../../types/invoice';

export function InvoiceRevisionHistory({ revisions }: { revisions: InvoiceRevision[] }) {
  const ordered = [...revisions].reverse();
  return (
    <Card>
      <CardHeader>
        <h2>Revision history</h2>
        <Badge>{revisions.length} revisions</Badge>
      </CardHeader>
      <CardBody>
        <ul className="timeline">
          {ordered.map((revision) => (
            <li key={revision.n}>
              <b>Revision {revision.n}</b>{' '}
              {revision.n === revisions[revisions.length - 1]?.n && <Badge>Current</Badge>}
              <div className="sm muted">{revision.date} · Pragesh · {money(revision.total)}</div>
              <div className="sm">{revision.note}</div>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

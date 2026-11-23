import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { EmptyState } from '../components/common/EmptyState';
import { CustomerDetails } from '../components/customer/CustomerDetails';
import { useData } from '../context/DataContext';

export function CustomerDetailsPage() {
  const { customerId } = useParams();
  const { getCustomer, invoices } = useData();
  const navigate = useNavigate();
  const customer = getCustomer(customerId ?? '');

  if (!customer) {
    return <EmptyState title="Customer not found" description="This customer is not available in the current mock data." />;
  }

  return (
    <>
      <div className="page-head">
        <div><h1>{customer.name}</h1><p className="muted">Customer details and billing history.</p></div>
        <Button onClick={() => navigate('/customers')}>Back to customers</Button>
      </div>
      <Card>
        <CardHeader><h2>{customer.name}</h2><Button variant="ghost" icon="x" iconOnly aria-label="Close" onClick={() => navigate('/customers')} /></CardHeader>
        <CardBody><CustomerDetails customer={customer} invoices={invoices} /></CardBody>
      </Card>
    </>
  );
}

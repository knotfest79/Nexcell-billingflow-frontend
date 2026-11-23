import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { SearchInput } from '../components/common/SearchInput';
import { CustomerTable } from '../components/customer/CustomerTable';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';

export function CustomersPage() {
  const { customers } = useData();
  const { openModal } = useModal();
  const location = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if ((location.state as { focusSearch?: boolean } | null)?.focusSearch) searchRef.current?.focus();
  }, [location.state]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return customers.filter((customer) => !query || `${customer.name} ${customer.businessCode} ${customer.email}`.toLowerCase().includes(query));
  }, [customers, search]);

  return (
    <>
      <div className="page-head">
        <div><h1>Customers</h1><p className="muted">People and businesses you bill.</p></div>
        <Button variant="primary" icon="plus" onClick={() => openModal('customer')}>New Customer</Button>
      </div>
      <Card>
        <div className="toolbar">
          <SearchInput inputRef={searchRef} value={search} onChange={setSearch} placeholder="Search customers" label="Search customers" />
        </div>
        <CustomerTable customers={filtered} />
      </Card>
    </>
  );
}

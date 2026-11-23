import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useModal } from '../../context/ModalContext';
import { useTheme } from '../../context/ThemeContext';
import { Modal } from './Modal';

interface Command {
  group: string;
  title: string;
  run: () => void;
}

export function CommandPalette() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { invoices, customers, services } = useData();
  const { closeModal, openModal } = useModal();
  const { toggleTheme } = useTheme();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const commands = useMemo<Command[]>(() => {
    const go = (title: string, path: string, group = 'Go to'): Command => ({
      group,
      title,
      run: () => navigate(path),
    });

    return [
      go('Dashboard', '/'),
      go('Invoices', '/invoices'),
      go('Customers', '/customers'),
      go('Services', '/services'),
      go('Payments', '/payments'),
      go('Receipts', '/receipts'),
      go('Reminders', '/reminders'),
      go('Tax & Records', '/tax-records'),
      go('Reports', '/reports'),
      go('Settings', '/settings'),
      {
        group: 'Action',
        title: 'Create Invoice',
        run: () => navigate('/invoices/new'),
      },
      {
        group: 'Action',
        title: 'Search Invoice',
        run: () => navigate('/invoices', { state: { focusSearch: true } }),
      },
      {
        group: 'Action',
        title: 'Search Customer',
        run: () => navigate('/customers', { state: { focusSearch: true } }),
      },
      { group: 'Action', title: 'Record Payment', run: () => openModal('payment') },
      { group: 'Action', title: 'Open Settings', run: () => navigate('/settings') },
      { group: 'Action', title: 'Open Services', run: () => navigate('/services') },
      { group: 'Action', title: 'Toggle dark mode', run: toggleTheme },
      ...invoices.map((invoice) => ({
        group: 'Invoice',
        title: `${invoice.invoiceNumber} · ${customers.find((c) => c.id === invoice.customerId)?.name ?? ''}`,
        run: () => navigate(`/invoices/${invoice.id}`),
      })),
      ...customers.map((customer) => ({
        group: 'Customer',
        title: customer.name,
        run: () => navigate(`/customers/${customer.id}`),
      })),
      ...services.map((service) => ({
        group: 'Service',
        title: `${service.name} (${service.code})`,
        run: () => navigate('/services'),
      })),
    ];
  }, [navigate, invoices, customers, services, openModal, toggleTheme]);

  const results = useMemo(() => {
    const text = query.toLowerCase().trim();
    return commands.filter((command) => !text || `${command.title} ${command.group}`.toLowerCase().includes(text)).slice(0, 9);
  }, [commands, query]);

  const run = (command?: Command) => {
    if (!command) return;
    closeModal();
    command.run();
  };

  return (
    <Modal variant="top" label="Command palette" onClose={closeModal}>
      <div className="card-b" style={{ padding: 0 }}>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              setSelected((current) => (current + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % (results.length || 1));
            }
            if (event.key === 'Enter') {
              event.preventDefault();
              run(results[selected]);
            }
          }}
          placeholder="Search invoices, customers, services or actions"
          aria-label="Search"
          autoComplete="off"
        />
        <ul role="listbox">
          {results.length ? (
            results.map((command, index) => (
              <li
                key={`${command.group}-${command.title}`}
                role="option"
                aria-selected={index === selected}
                className={index === selected ? 'on' : ''}
                onMouseEnter={() => setSelected(index)}
                onClick={() => run(command)}
              >
                <span>{command.title}</span>
                <span className="g">{command.group}</span>
              </li>
            ))
          ) : (
            <li className="g">No matches. Try an invoice number, customer or service.</li>
          )}
        </ul>
      </div>
    </Modal>
  );
}

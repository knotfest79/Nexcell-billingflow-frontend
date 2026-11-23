import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Dropdown, MenuItem } from '../common/Dropdown';
import { SyncIndicator } from '../common/SyncIndicator';
import { useModal } from '../../context/ModalContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

const TITLES: Record<string, [string, string]> = {
  '/': ['Dashboard', 'Overview of your billing activity.'],
  '/invoices': ['Invoices', 'Create, track and manage customer invoices.'],
  '/invoices/new': ['New Invoice', 'Create and send a professional invoice.'],
  '/customers': ['Customers', 'People and businesses you bill.'],
  '/services': ['Services', 'Services and codes used in invoice numbers.'],
  '/payments': ['Payments', 'Money received against invoices.'],
  '/receipts': ['Receipts', 'Proof of payment for your customers.'],
  '/reminders': ['Reminders', 'Chase late payments.'],
  '/tax-records': ['Tax & Records', 'Keep clean records for your accountant.'],
  '/reports': ['Reports', 'Understand where your revenue comes from.'],
  '/settings': ['Settings', 'Manage your business and preferences.'],
};

function getHeaderText(pathname: string): [string, string] {
  if (pathname.startsWith('/invoices/new')) return TITLES['/invoices/new'];
  if (/^\/invoices\/[^/]+\/edit$/.test(pathname)) return ['Edit Invoice', 'Changes are saved as a new revision.'];
  const detail = pathname.match(/^\/invoices\/([^/]+)$/);
  if (detail) return [`Invoice #${decodeURIComponent(detail[1])}`, 'Invoice details and activity.'];
  const customer = pathname.match(/^\/customers\/([^/]+)$/);
  if (customer) return ['Customer Details', 'Customer record and activity.'];
  return TITLES[pathname] ?? ['Dashboard', 'Overview of your billing activity.'];
}

interface HeaderProps {
  onMenu: () => void;
  onCollapse: () => void;
}

export function Header({ onMenu, onCollapse }: HeaderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { toggleTheme } = useTheme();
  const { toast } = useToast();
  const [title, subtitle] = getHeaderText(pathname);

  return (
    <header className="topbar">
      <Button iconOnly variant="ghost" icon="menu" className="menu-btn" aria-label="Open menu" onClick={onMenu} />
      <Button iconOnly variant="ghost" icon="panel" className="hide-m" aria-label="Collapse sidebar" onClick={onCollapse} />
      <div>
        <h1>{title}</h1>
        <div className="sm muted hide-m">{subtitle}</div>
      </div>
      <span className="spacer" />
      <Button variant="ghost" icon="search" aria-label="Search and commands" onClick={() => openModal('command')}>
        <span className="kbd hide-m">⌘K</span>
      </Button>
      <SyncIndicator />
      <Dropdown id="notif" trigger={<Button iconOnly variant="ghost" icon="bell" aria-label="Notifications" />}>
        <MenuItem onClick={() => toast('2 invoices are overdue', 'warning')}>2 invoices are overdue</MenuItem>
        <MenuItem onClick={() => toast('Payment received – $650.00')}>Payment received – $650.00</MenuItem>
        <MenuItem onClick={() => toast('Invoice email failed', 'error')}>Invoice email failed</MenuItem>
      </Dropdown>
      <Dropdown id="create" trigger={<Button variant="primary" icon="plus">Create</Button>}>
        <MenuItem onClick={() => navigate('/invoices/new')}>New Invoice</MenuItem>
        <MenuItem onClick={() => openModal('customer')}>New Customer</MenuItem>
        <MenuItem onClick={() => openModal('payment')}>Record Payment</MenuItem>
        <MenuItem onClick={() => openModal('service')}>New Service</MenuItem>
      </Dropdown>
      <Dropdown trigger={<button aria-label="User menu" className="avatar">P</button>}>
        <MenuItem onClick={() => navigate('/settings')}>Business profile</MenuItem>
        <MenuItem onClick={toggleTheme}>Toggle dark mode</MenuItem>
        <MenuItem onClick={() => toast('Signed out (demo)', 'info')}>Sign out</MenuItem>
      </Dropdown>
    </header>
  );
}

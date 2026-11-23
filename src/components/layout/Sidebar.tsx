import { NavLink } from 'react-router-dom';
import { Icon } from '../common/Icon';
import { useToast } from '../../context/ToastContext';
import nexcellLogo from '../../assets/brand/icon-nexcel.jpeg';
import type { IconName } from '../../utils/icons';

export const NAV_ITEMS: { to: string; label: string; icon: IconName }[] = [
  { to: '/', label: 'Dashboard', icon: 'home' },
  { to: '/invoices', label: 'Invoices', icon: 'doc' },
  { to: '/customers', label: 'Customers', icon: 'users' },
  { to: '/services', label: 'Services', icon: 'tag' },
  { to: '/payments', label: 'Payments', icon: 'card' },
  { to: '/receipts', label: 'Receipts', icon: 'receipt' },
  { to: '/reminders', label: 'Reminders', icon: 'clock' },
  { to: '/tax-records', label: 'Tax & Records', icon: 'doc' },
  { to: '/reports', label: 'Reports', icon: 'chart' },
  { to: '/settings', label: 'Settings', icon: 'gear' },
];

export function Sidebar() {
  const { toast } = useToast();

  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="brand">
        <img className="brand-logo" src={nexcellLogo} alt="Nexcell" />
        <div><b>Nexcell</b><span>BillingFlow</span></div>
      </div>
      <nav className="nav">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
            <Icon name={item.icon} />
            <span className="lbl">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="account">
        <a className="side-link" onClick={() => toast('Help (demo)', 'info')}><span className="lbl">Help</span></a>
        <a className="side-link" onClick={() => toast('Signed out (demo)', 'info')}><span className="lbl">Sign out</span></a>
        <div className="acct">
          <span className="avatar">NP</span>
          <div><b>Nexcell Digital</b><div className="sm muted">Pragesh · Owner</div></div>
        </div>
      </div>
    </aside>
  );
}

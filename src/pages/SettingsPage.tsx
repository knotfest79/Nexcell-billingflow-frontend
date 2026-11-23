import { useState } from 'react';
import { Button } from '../components/common/Button';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { StatusBadge } from '../components/common/StatusBadge';
import { Toggle } from '../components/common/Toggle';
import { settingsSections } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { formatDisplayDate, getTodayISO } from '../utils/date';
import { useSync } from '../context/SyncContext';

export function SettingsPage() {
  const [section, setSection] = useState<string>(settingsSections[0]);
  const [cloudSync, setCloudSync] = useState(true);
  const { toast } = useToast();
  const { label } = useSync();

  return (
    <>
      <div className="page-head">
        <div><h1>Settings</h1><p className="muted">Manage your business and preferences.</p></div>
      </div>
      <div className="settings">
        <div className="snav">
          {settingsSections.map((item) => (
            <button key={item} className={item === section ? 'on' : ''} onClick={() => setSection(item)}>{item}</button>
          ))}
        </div>
        <Card>
          <CardHeader><h2>{section}</h2></CardHeader>
          <CardBody>
            {section === 'Cloud & Sync' ? (
              <>
                <div className="srow">
                  <div><b>Cloud Sync</b><div className="sm muted"><StatusBadge status="Paid">{label}</StatusBadge> Last sync: {formatDisplayDate(getTodayISO())}, 4:47 PM</div></div>
                  <Toggle label="Enable cloud sync" checked={cloudSync} onChange={setCloudSync} />
                </div>
                <div className="srow">
                  <div><b>Device</b><div className="sm muted">Pragesh’s MacBook</div></div>
                  <div className="row">
                    <Button onClick={() => toast('Syncing…', 'info')}>Sync Now</Button>
                    <Button onClick={() => toast('Devices (demo)', 'info')}>Manage Devices</Button>
                  </div>
                </div>
                <div className="srow">
                  <div><b>Offline storage</b><div className="sm muted">Billing continues offline. Changes sync when available.</div></div>
                  <StatusBadge status="Paid">Available</StatusBadge>
                </div>
              </>
            ) : (
              <>
                <div className="form-grid">
                  <div className="field"><label>Business name</label><input defaultValue="Nexcell Digital" /></div>
                  <div className="field"><label>ABN</label><input defaultValue="42 427 108 413" /></div>
                  <div className="field"><label>Email</label><input defaultValue="billing@nexcell.com.au" /></div>
                  <div className="field"><label>Business code</label><input defaultValue="NXC" /></div>
                </div>
                <Button variant="primary" className="mt" onClick={() => toast('Settings saved')}>Save changes</Button>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

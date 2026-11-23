import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNavigation } from './MobileNavigation';
import { ModalHost } from '../common/ModalHost';
import { Button } from '../common/Button';
import { useModal } from '../../context/ModalContext';
import { useSync } from '../../context/SyncContext';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { pathname } = useLocation();
  const { activeModal, openModal, closeModal } = useModal();
  const { state: syncState } = useSync();

  useEffect(() => {
    setDrawer(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
        return;
      }
      const active = document.activeElement;
      const typing = active instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(active.tagName);
      const commandKey = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      if (commandKey || (event.key === '/' && !typing)) {
        event.preventDefault();
        if (!activeModal) openModal('command');
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeModal, closeModal, openModal]);

  return (
    <div className={`app ${collapsed ? 'collapsed' : ''} ${drawer ? 'drawer' : ''}`.trim()}>
      <Sidebar />
      <div className="main">
        <Header onMenu={() => setDrawer((current) => !current)} onCollapse={() => setCollapsed((current) => !current)} />
        <main className="content">
          {syncState === 'conflict' && (
            <div className="alert danger">
              <div>
                <b>Sync conflict</b>
                <p className="sm">#830418-EST-WHM was edited on two devices. Review before syncing continues.</p>
              </div>
              <Button onClick={() => openModal('conflict')}>Review</Button>
            </div>
          )}
          <Outlet />
        </main>
      </div>
      <MobileNavigation open={drawer} onClose={() => setDrawer(false)} />
      <ModalHost />
    </div>
  );
}

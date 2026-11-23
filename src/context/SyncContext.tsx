import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { SyncState } from '../types/common';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const SYNC_SEQUENCE: SyncState[] = ['online', 'syncing', 'pending', 'offline', 'error', 'conflict'];

export const SYNC_LABELS: Record<SyncState, string> = {
  online: 'All changes synced',
  offline: 'Offline',
  syncing: 'Syncing...',
  pending: '3 changes waiting',
  error: 'Sync error',
  conflict: 'Conflict · review needed',
};

interface SyncContextValue {
  state: SyncState;
  label: string;
  cycle: () => void;
  setSync: (state: SyncState) => void;
}

const SyncContext = createContext<SyncContextValue | null>(null);

export function SyncProvider({ children }: { children: ReactNode }) {
  const online = useOnlineStatus();
  const [state, setState] = useState<SyncState>(online ? 'online' : 'offline');

  useEffect(() => {
    setState(online ? 'online' : 'offline');
  }, [online]);

  const value = useMemo<SyncContextValue>(() => ({
    state,
    label: SYNC_LABELS[state],
    cycle: () => setState((current) => {
      const index = SYNC_SEQUENCE.indexOf(current);
      return SYNC_SEQUENCE[(index + 1) % SYNC_SEQUENCE.length];
    }),
    setSync: setState,
  }), [state]);

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
}

export function useSync(): SyncContextValue {
  const context = useContext(SyncContext);
  if (!context) throw new Error('useSync must be used within SyncProvider');
  return context;
}

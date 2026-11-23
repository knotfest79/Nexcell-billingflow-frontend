import type { SyncState } from '../types/common';

/**
 * Offline-first extension points. The current app renders mock state only;
 * these types keep the future shape explicit so persistence can be added
 * without touching page components.
 */
export interface PendingChange {
  id: string;
  entity: 'invoice' | 'customer' | 'service' | 'payment';
  operation: 'create' | 'update' | 'delete';
  payload: unknown;
  createdAt: string;
}

export interface SyncSnapshot {
  state: SyncState;
  pendingChanges: PendingChange[];
  lastSyncedAt?: string;
  conflicts?: string[];
}

export const emptySyncSnapshot: SyncSnapshot = {
  state: 'online',
  pendingChanges: [],
};

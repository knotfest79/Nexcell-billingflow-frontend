export type ToastKind = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: number;
  message: string;
  kind: ToastKind;
}

export type SyncState = 'online' | 'offline' | 'syncing' | 'pending' | 'error' | 'conflict';

export interface SelectOption {
  value: string;
  label: string;
}

export interface Address {
  line1: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
}

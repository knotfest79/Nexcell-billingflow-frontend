import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Invoice } from '../types/invoice';

export type ModalName = 'review' | 'payment' | 'customer' | 'service' | 'conflict' | 'backdated' | 'confirmUpdate' | 'command';

export interface ModalPayload {
  invoice?: Invoice;
  invoiceId?: string;
  invoiceNumber?: string;
  onConfirm?: () => void;
}

interface ModalContextValue {
  activeModal: ModalName | null;
  modalPayload: ModalPayload;
  openModal: (name: ModalName, payload?: ModalPayload) => void;
  closeModal: () => void;
}

const emptyPayload: ModalPayload = {};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalName | null>(null);
  const [modalPayload, setModalPayload] = useState<ModalPayload>(emptyPayload);

  const value = useMemo<ModalContextValue>(
    () => ({
      activeModal,
      modalPayload,
      openModal: (name, payload = emptyPayload) => {
        setModalPayload(payload);
        setActiveModal(name);
      },
      closeModal: () => {
        setActiveModal(null);
        setModalPayload(emptyPayload);
      },
    }),
    [activeModal, modalPayload],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
}

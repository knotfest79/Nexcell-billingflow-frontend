import type { ReactNode } from 'react';

interface ModalProps {
  title?: string;
  titleId?: string;
  children: ReactNode;
  footer?: ReactNode;
  variant?: 'default' | 'wide' | 'top';
  onClose: () => void;
  label?: string;
}

export function Modal({ title, titleId, children, footer, variant = 'default', onClose, label }: ModalProps) {
  const overlayClass = ['overlay', variant === 'top' ? 'top' : ''].filter(Boolean).join(' ');
  return (
    <div
      className={overlayClass}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div className={`modal ${variant === 'wide' ? 'wide' : ''} ${variant === 'top' ? 'cmd' : ''}`.trim()} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-label={label}>
        {title && (
          <div className="card-h">
            <h2 id={titleId}>{title}</h2>
          </div>
        )}
        {children}
        {footer && <div className="modal-f">{footer}</div>}
      </div>
    </div>
  );
}

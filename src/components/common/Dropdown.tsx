import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from './Button';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  id?: string;
  triggerClassName?: string;
  'aria-label'?: string;
}

export function Dropdown({ trigger, children, id, triggerClassName = '', ...aria }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocumentClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocumentClick);
    return () => document.removeEventListener('mousedown', onDocumentClick);
  }, [open]);

  return (
    <div className="dd" ref={rootRef}>
      <div onClick={() => setOpen((current) => !current)} className={triggerClassName} aria-label={aria['aria-label']}>
        {trigger}
      </div>
      <div className="menu" id={id} hidden={!open}>
        {children}
      </div>
    </div>
  );
}

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export function MenuItem({ children, onClick }: MenuItemProps) {
  return <button onClick={onClick}>{children}</button>;
}

export function IconDropdown({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Dropdown trigger={<Button iconOnly variant="ghost" aria-label={label}>⋯</Button>} aria-label={label}>
      {children}
    </Dropdown>
  );
}

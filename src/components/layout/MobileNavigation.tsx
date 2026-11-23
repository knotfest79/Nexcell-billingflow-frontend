interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  if (!open) return null;
  return <div className="mobile-backdrop" onClick={onClose} aria-hidden="true" />;
}

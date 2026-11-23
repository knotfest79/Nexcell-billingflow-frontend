import type { ReactNode } from 'react';

interface StatusBadgeProps {
  status: string;
  children?: ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className = '' }: StatusBadgeProps) {
  return <span className={`pill ${status} ${className}`.trim()}>{children ?? status}</span>;
}

export function Badge({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <span className={`badge ${className}`.trim()} style={style}>{children}</span>;
}

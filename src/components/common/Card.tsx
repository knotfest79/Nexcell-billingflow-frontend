import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}

export function CardHeader({ children, className = '' }: CardProps) {
  return <div className={`card-h ${className}`.trim()}>{children}</div>;
}

export function CardBody({ children, className = '' }: CardProps) {
  return <div className={`card-b ${className}`.trim()}>{children}</div>;
}

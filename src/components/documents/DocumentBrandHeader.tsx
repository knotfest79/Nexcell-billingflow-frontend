import type { ReactNode } from 'react';
import nexcellWordmark from '../../assets/brand/logo-nexcel-black.png';
import type { DocumentMetaItem } from '../../types/documents';

interface DocumentBrandHeaderProps {
  title: string;
  tone?: 'dark' | 'green';
  identifier?: string;
  meta: DocumentMetaItem[];
  badge?: ReactNode;
  variant?: 'invoice' | 'receipt';
}

export function DocumentBrandHeader({
  title,
  tone = 'dark',
  identifier,
  meta,
  badge,
  variant = 'invoice',
}: DocumentBrandHeaderProps) {
  return (
    <header className={`doc-header doc-header--${variant}`}>
      <div className="doc-header__brand">
        <img className="doc-wordmark" src={nexcellWordmark} alt="Nexcell" />
        {badge && <div className="doc-header__badge">{badge}</div>}
      </div>
      <div className="doc-header__meta">
        <h1 className={`doc-title${tone === 'green' ? ' doc-title--green' : ''}`}>{title}</h1>
        {identifier && <div className="doc-identifier">{identifier}</div>}
        <dl className="doc-meta-list">
          {meta.map((item) => (
            <div className="doc-meta-row" key={item.label}>
              <dt>{item.label}:</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

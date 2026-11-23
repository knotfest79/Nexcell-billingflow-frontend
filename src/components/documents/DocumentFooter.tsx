import nexcellMark from '../../assets/brand/icon-nexcel.jpeg';
import type { CompanyProfile } from '../../types/documents';

interface DocumentFooterProps {
  company: CompanyProfile;
  variant?: 'invoice' | 'receipt';
}

export function DocumentFooter({ company, variant = 'invoice' }: DocumentFooterProps) {
  return (
    <footer className={`doc-footer doc-footer--${variant}`}>
      <img className="doc-footer__mark" src={nexcellMark} alt="" />
      <div className="doc-footer__copy">
        <strong>{variant === 'invoice' ? company.name : company.markLabel}</strong>
        <div>{company.tagline}{variant === 'receipt' ? '.' : ''}</div>
      </div>
    </footer>
  );
}

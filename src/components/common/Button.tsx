import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { IconName } from '../../utils/icons';
import { Icon } from './Icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost';
  icon?: IconName;
  iconOnly?: boolean;
  children?: ReactNode;
}

export function Button({ variant = 'default', icon, iconOnly, className = '', children, type = 'button', ...rest }: ButtonProps) {
  const classes = ['btn', variant !== 'default' ? variant : '', iconOnly ? 'icon' : ''].filter(Boolean).join(' ');
  return (
    <button type={type} className={`${classes} ${className}`.trim()} {...rest}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

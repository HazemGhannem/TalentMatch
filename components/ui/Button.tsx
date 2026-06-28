import { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'default' | 'sm';
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'default',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost';
  const sizeClass = size === 'sm' ? 'btn-sm' : '';

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner /> : icon}
      <span>{children}</span>
    </button>
  );
}

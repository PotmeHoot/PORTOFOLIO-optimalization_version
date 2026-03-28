import { ReactNode, AnchorHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
  href?: string;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  href,
  ...props 
}: ButtonProps) => {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    light: 'btn-light'
  };

  return (
    <a 
      href={href}
      className={cn(variantClasses[variant], className)} 
      {...props}
    >
      {children}
    </a>
  );
};

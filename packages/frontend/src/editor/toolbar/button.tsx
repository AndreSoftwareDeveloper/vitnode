import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Button } from '../../components/ui/button';
import { cn } from '../../helpers/classnames';

interface Props {
  children: React.ReactNode;
  name: string;
  active?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const ButtonToolbarEditor = ({
  active,
  children,
  disabled,
  name,
  onClick,
  className,
  ...rest
}: Props) => {
  const t = useTranslations('core.editor');

  return (
    <Button
      variant="ghost"
      className={cn('hover:bg-muted size-9 shadow-none', className, {
        'bg-accent': active,
      })}
      size="icon"
      onClick={onClick}
      ariaLabel={t(name)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
};

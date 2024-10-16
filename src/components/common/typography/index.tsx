import cn from '@/utils/cn';
import React, { ElementType } from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'body-small' | 'small';

interface Props {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}

const tags: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  body: 'p',
  'body-small': 'p',
  small: 'span',
};

const sizes: Record<Variant, string> = {
  h1: 'text-4xl font-semibold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-semibold',
  body: 'text-md',
  'body-small': 'text-sm',
  small: 'text-xs',
};

export const Typography = ({ variant, children, className, as }: Props) => {
  const sizeClasses = sizes[variant];
  const Tag = as || tags[variant];
  return className ? (
    <Tag className={cn(sizeClasses, className)}>{children}</Tag>
  ) : (
    <Tag className={`${sizeClasses}`}>{children}</Tag>
  );
};

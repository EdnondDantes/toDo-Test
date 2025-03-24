// ActionButton.tsx
import { FC, ButtonHTMLAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ActionButton.module.scss';

type ActionButtonProps = {
  label: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ActionButton: FC<ActionButtonProps> = ({ 
  onClick, 
  label, 
  className,
  ...props 
}) => {
  return (
    <button
      className={classNames(cls.ActionButton, {}, className ? [className] : [])}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
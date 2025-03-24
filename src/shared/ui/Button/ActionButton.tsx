import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ActionButton.module.scss';

type ActionButtonProps = {
  onClick: () => void;
  label: string;
  className?: string;
};

export const ActionButton: FC<ActionButtonProps> = ({ onClick, label, className }) => {
  return (
    <button
      className={classNames(cls.ActionButton, {}, className ? [className] : [])}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

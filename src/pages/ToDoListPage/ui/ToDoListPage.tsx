import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ToDoListPage.module.scss';
import { ToDoList } from '@/widgets/ToDoList';

export const ToDoListPage: FC = () => {
  return (
    <div className={classNames(cls.ToDoListPage, {}, [])}>
      <ToDoList />
    </div>
  );
};



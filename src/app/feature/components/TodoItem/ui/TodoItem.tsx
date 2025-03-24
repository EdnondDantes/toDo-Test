// TodoItem.tsx
import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Todo } from '@/widgets/ToDoList/model/types/todo';
import cls from './TodoItem.module.scss';

type TodoItemProps = {
  todo: Todo;  
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
};

export const TodoItem: FC<TodoItemProps> = ({ todo, onRemove, onToggle }) => {
  return (
    <li className={classNames(cls.TodoItem, { [cls.completed]: todo.completed }, [])}>
      <span onClick={() => onToggle(todo.id)}>{todo.text}</span>
      <button onClick={() => onRemove(todo.id)}>Удалить</button>
    </li>
  );
};

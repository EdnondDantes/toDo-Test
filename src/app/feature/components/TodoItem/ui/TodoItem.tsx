import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Todo } from '@/widgets/ToDoList/model/types/todo';
import { ActionButton } from '@/shared/ui/Button/ActionButton';
import cls from './TodoItem.module.scss';

type TodoItemProps = {
  todo: Todo;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
};

export const TodoItem: FC<TodoItemProps> = ({ todo, onRemove, onToggle }) => {
  return (
    <li className={classNames(cls.TodoItem, { [cls.completed]: todo.completed }, [])}>
      <label className={cls.label}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className={cls.checkbox}
        />
        <span className={cls.todoText}>{todo.text}</span>
      </label>
      <ActionButton
        onClick={() => onRemove(todo.id)}
        label="Удалить"
        className={cls.deleteButton}
      />
    </li>
  );
};
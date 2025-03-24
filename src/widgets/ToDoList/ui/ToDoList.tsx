import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ActionButton } from '@/shared/ui/Button/ActionButton';
import { addTodo, clearTodos, removeTodo, toggleTodo } from '@/widgets/ToDoList/model/slice/todoSlice';
import { TodoItem } from '@/app/feature/components/TodoItem';
import { Todo } from '../model/types/todo';
import cls from './ToDoList.module.scss';


export const ToDoList: FC = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

  const todos = useSelector((state: any) => state.todos.todos); 
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodoText) {
      dispatch(addTodo({ text: newTodoText, completed: false }));
      setNewTodoText('');
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleClearTodos = () => {
    dispatch(clearTodos());
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  const remainingCount = todos.filter((todo: Todo) => !todo.completed).length;

  return (
    <div className={classNames(cls.ToDoList, {}, [])}>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Введите задачу"
        />
        <ActionButton onClick={handleAddTodo} label="Добавить задачу" />
      </div>
      <div className={classNames(cls.buttonGroup, {}, [])}>
        <ActionButton onClick={() => setFilter('all')} label="Все задачи" />
        <ActionButton onClick={() => setFilter('active')} label="Невыполненные" />
        <ActionButton onClick={() => setFilter('completed')} label="Выполненные" />
        <ActionButton onClick={handleClearTodos} label="Очистить все" className={cls.clearButton} />
      </div>
      <div>
        <p>Осталось: {remainingCount}</p>
      </div>
      <ul>
        {filteredTodos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={handleRemoveTodo}
            onToggle={handleToggleTodo}
          />
        ))}
      </ul>
    </div>
  );
};

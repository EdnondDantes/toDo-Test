import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ActionButton } from '@/shared/ui/Button/ActionButton';
import { addTodo, clearTodos, removeTodo, toggleTodo } from '@/widgets/ToDoList/model/slice/todoSlice';
import { TodoItem } from '@/app/feature/components/TodoItem';
import { Todo } from '../model/types/todo';
import { RootState, AppDispatch } from '@/app/providers/store/store';
import cls from './ToDoList.module.scss';

export const ToDoList: FC = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [error, setError] = useState<string | null>(null);

  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTodo = () => {
    try {
      const text = newTodoText.trim();
      if (!text) {
        setError('Задача не может быть пустой');
        return;
      }
      
      dispatch(addTodo({ text, completed: false }));
      setNewTodoText('');
      setError(null);
    } catch (e) {
      setError('Не удалось добавить задачу');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
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
      {error && <div className={cls.errorMessage}>{error}</div>}
      <div className={cls.inputContainer}>
        <input
          className={cls.inputField}
          type="text"
          value={newTodoText}
          onChange={(e) => {
            setNewTodoText(e.target.value);
            setError(null);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Введите задачу"
        />
        <ActionButton 
          onClick={handleAddTodo} 
          label="Добавить задачу"
          disabled={!newTodoText.trim()}
        />
      </div>
      <div className={classNames(cls.buttonGroup, {}, [])}>
        <ActionButton onClick={() => setFilter('all')} label="Все задачи" />
        <ActionButton onClick={() => setFilter('active')} label="Невыполненные" />
        <ActionButton onClick={() => setFilter('completed')} label="Выполненные" />
        <ActionButton 
          onClick={handleClearTodos} 
          label="Очистить все" 
          className={cls.clearButton}
          disabled={todos.length === 0}
        />
      </div>
      <div className={cls.counter}>
        <p>Осталось задач: {remainingCount}</p>
      </div>
      <ul className={cls.todoList}>
        {filteredTodos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={handleRemoveTodo}
            onToggle={handleToggleTodo}
          />
        ))}
        {filteredTodos.length === 0 && (
          <li className={cls.emptyState}>Нет задач для отображения</li>
        )}
      </ul>
    </div>
  );
};
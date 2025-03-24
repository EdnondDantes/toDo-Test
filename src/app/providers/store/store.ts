import { configureStore, Middleware} from '@reduxjs/toolkit';
import todoReducer from '@/widgets/ToDoList/model/slice/todoSlice';
import { TodoState } from '@/widgets/ToDoList/model/types/todo';

const loadFromLocalStorage = (): { todos: TodoState } | undefined => {
  try {
    const serializedState = localStorage.getItem('todos');
    return serializedState ? { todos: JSON.parse(serializedState) } : undefined;
  } catch (e) {
    console.error('Failed to load state from localStorage:', e);
    return undefined;
  }
};

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof (action as { type: string }).type === 'string' &&
    (action as { type: string }).type.startsWith('todos/')
  ) {
    try {
      const state = store.getState().todos;
      localStorage.setItem('todos', JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }
  
  return result;
};


export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: loadFromLocalStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
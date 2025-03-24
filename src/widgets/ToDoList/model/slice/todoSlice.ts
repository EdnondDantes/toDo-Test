// store/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from '../types/todo';


const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, 'id'>>) => {
      const newTodo = {
        id: Date.now(),
        ...action.payload,
      };
      state.todos.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    clearTodos: (state) => {
      state.todos = [];
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;

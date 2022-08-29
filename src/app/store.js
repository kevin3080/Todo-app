import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/slices/todosSlice';
import themeReducer from '../features/slices/themeSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    theme: themeReducer,
  },
});

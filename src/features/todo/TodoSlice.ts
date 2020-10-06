import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoInterface, TodoStateInterface } from '../../app/interfaces';

const initialState: TodoStateInterface = {
    todos: [],
    loading: false,
    error: "",
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload
        },
        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload
        },
        setTodos: (state, { payload }: PayloadAction<TodoInterface[]>) => {
            state.todos = payload
        },
        addTodo: (state, action: PayloadAction<TodoInterface>) => {
            state.todos.push(action.payload)
        },
        doneTodo: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.todos = state.todos.map((todo: TodoInterface) => todo.id === id ? { ...todo, done: !todo.done } : todo);
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.todos = state.todos.filter((todo: TodoInterface) => todo.id === id ? false : true);
        },
    },
});

export const { setLoading, setError, setTodos, addTodo, doneTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;

export const todosSelector = (state: { todo: TodoStateInterface }) => state.todo;
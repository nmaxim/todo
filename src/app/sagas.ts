import { all, call, put, takeEvery } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { setLoading, setError, setTodos, addTodo, doneTodo, deleteTodo } from '../features/todo/TodoSlice';
import * as api from './api';
import { TodoNewInterface, TodoInterface } from '../app/interfaces';

export function* callGetTodos() {
    yield put(setLoading(true));
    try {
        const response = yield call(api.fetchTodos);
        const fetchedTodos: TodoInterface[] = [];
        for (let key in response) {
            fetchedTodos.push({
                ...response[key],
                id: key
            });
        }
        yield put(setTodos(fetchedTodos));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setError(error));
        yield put(setLoading(false));
    }
}

type addParams = { payload: TodoNewInterface, type: string };
export function* callAddTodo({ payload }: addParams) {
    yield put(setLoading(true));
    try {
        const fetchedTodos = yield call(api.addTodo, payload);
        yield put(addTodo({
            ...payload,
            id: fetchedTodos.name
        }));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setError(error));
        yield put(setLoading(false));
    }
}

type doneParams = { payload: TodoInterface, type: string };
export function* callDoneTodo({ payload }: doneParams) {
    yield put(setLoading(true));
    try {
        yield call(api.doneTodo, payload.id, payload.done);
        yield put(doneTodo(payload.id));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setError(error));
        yield put(setLoading(false));
    }
}

type deleteParams = { payload: string, type: string };
export function* callDeleteTodo({ payload }: deleteParams) {
    yield put(setLoading(true));
    try {
        yield call(api.deleteTodo, payload);
        yield put(deleteTodo(payload));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setError(error));
        yield put(setLoading(false));
    }
}

export default function* rootSaga() {
    yield all([
        yield takeEvery(getTodosCall.type, callGetTodos),
        yield takeEvery(addTodoCall.type, callAddTodo),
        yield takeEvery(addDoneCall.type, callDoneTodo),
        yield takeEvery(addDeleteCall.type, callDeleteTodo),
    ]);
}

export const getTodosCall = createAction<undefined>('todo/callGet');

export const addTodoCall = createAction('todo/callAdd', (todoNewItem: TodoNewInterface) => {
    return {
        payload: todoNewItem
    }
});

export const addDoneCall = createAction('todo/callDone', (todoItem: TodoInterface) => {
    return {
        payload: todoItem
    }
});

export const addDeleteCall = createAction('todo/callDelete', (todoItemId: string) => {
    return {
        payload: todoItemId
    }
});
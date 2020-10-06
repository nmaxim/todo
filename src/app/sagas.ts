import { all, call, put, takeEvery } from 'redux-saga/effects';
import { setLoading, setError, setTodos, addTodo, doneTodo, deleteTodo } from '../features/todo/TodoSlice';
import * as api from './api';
import { TodoNewInterface, TodoInterface } from '../app/interfaces';
import * as actionTypes from './actionTypes';

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

type addParams = { todoItem: TodoNewInterface, type: string };
export function* callAddTodo({ todoItem }: addParams) {
    yield put(setLoading(true));
    try {
        const fetchedTodos = yield call(api.addTodo, todoItem);
        yield put(addTodo({
            ...todoItem,
            id: fetchedTodos.name
        }));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setError(error));
        yield put(setLoading(false));
    }
}

type doneParams = { todoItemId: string, done: boolean, type: string };
export function* callDoneTodo({ todoItemId, done }: doneParams) {
    yield put(setLoading(true));
    try {
        yield call(api.doneTodo, todoItemId, done);
        yield put(doneTodo(todoItemId));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setError(error));
        yield put(setLoading(false));
    }
}

type deleteParams = { todoItemId: string, type: string };
export function* callDeleteTodo({ todoItemId }: deleteParams) {
    yield put(setLoading(true));
    try {
        yield call(api.deleteTodo, todoItemId);
        yield put(deleteTodo(todoItemId));
        yield put(setLoading(false));
    } catch (error) {
        yield put(setError(error));
        yield put(setLoading(false));
    }
}

export default function* rootSaga() {
    yield all([
        yield takeEvery(actionTypes.CALL_GET_TODOS, callGetTodos),
        yield takeEvery(actionTypes.CALL_ADD_TODO, callAddTodo),
        yield takeEvery(actionTypes.CALL_DONE_TODO, callDoneTodo),
        yield takeEvery(actionTypes.CALL_DELETE_TODO, callDeleteTodo)
    ]);
}

export const getTodosCall = () => ({
    type: actionTypes.CALL_GET_TODOS,
});

export const addTodoCall = (todoItem: TodoNewInterface) => ({
    type: actionTypes.CALL_ADD_TODO,
    todoItem,
});

export const addDoneCall = (todoItem: TodoInterface) => ({
    type: actionTypes.CALL_DONE_TODO,
    todoItemId: todoItem.id,
    done: todoItem.done,
});

export const addDeleteCall = (todoItemId: string) => ({
    type: actionTypes.CALL_DELETE_TODO,
    todoItemId,
});
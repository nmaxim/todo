import { TodoNewInterface, TodoListInterface } from './interfaces';

const url = 'https://todo-f89ba.firebaseio.com';

export const fetchTodos = async (): Promise<TodoListInterface | Error> => {
    const response = await fetch(url + '/todos.json', {
        method: "GET"
    });
    const todos: TodoListInterface = await response.json();
    return todos || [];
}

export const addTodo = async (todo: TodoNewInterface): Promise<boolean | Error> => {
    const response = await fetch(url + '/todos.json', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(todo)
    });
    const result: boolean = await response.json();
    return result;
}

export const doneTodo = async (todoId: string, done: boolean): Promise<boolean | Error> => {
    const response = await fetch(`${url}/todos/${todoId}/.json`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({done: done})
    });
    const result: boolean = await response.json();
    return result;
}

export const deleteTodo = async (todoId: string): Promise<boolean | Error> => {
    const response = await fetch(`${url}/todos/${todoId}/.json`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    });
    const result: boolean = await response.json();
    return result;
}
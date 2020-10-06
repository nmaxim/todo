export interface TodoNewInterface {
    message: string;
    done: boolean;
}

export interface TodoInterface extends TodoNewInterface {
    id: string;
}

export interface TodoStateInterface {
    todos: TodoInterface[];
    loading: boolean;
    error: string;
}

export interface TodoListInterface {
    todos: TodoInterface[];
}


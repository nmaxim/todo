import React from 'react';
import { TodoInterface, TodoListInterface } from '../../../app/interfaces';
import List from '@material-ui/core/List';
import TodoItem from '../TodoItem/TodoItem';

import classes from './TodoList.module.css';

const TodoList: React.FC<TodoListInterface> = ({ todos }) => {
    return (
        <List className={classes.Container}>
            {todos.map((todo: TodoInterface) => <TodoItem key={todo.id} {...todo} />)}
        </List>
    )
};
export default TodoList;
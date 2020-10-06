import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { TodoInterface } from '../../../app/interfaces';
import { addDoneCall, addDeleteCall } from "../../../app/sagas";
import { todosSelector } from "../../../features/todo/TodoSlice";

import classes from './TodoItem.module.css';

const TodoItem: React.FC<TodoInterface> = ({ id, message, done }) => {
    const dispatch = useDispatch();
    const { todos } = useSelector(todosSelector);

    const itemClass:string = done ? classes.Done : '';

    const onDoneClick = (id: string) => {
        const currentTodo = todos.find((todo:TodoInterface)  => todo.id === id);
        if (currentTodo) {
            const newTodo: TodoInterface = {
                ...currentTodo, 
                done: !currentTodo.done
            };
            dispatch(addDoneCall(newTodo));
        }
    };

    const onDeleteClick = (id: string) => {
        dispatch(addDeleteCall(id));
    };

    return (
        <ListItem button>
            <Checkbox
                color="primary"
                tabIndex={-1} 
                disableRipple
                checked={done}
                onClick={() => onDoneClick(id)}
            />
            <ListItemText primary={`TODO: ${message}`} className={itemClass}/>
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={() => onDeleteClick(id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
};
export default TodoItem;
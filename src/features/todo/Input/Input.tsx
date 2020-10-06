import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { addTodoCall } from "../../../app/sagas";

const Input: React.FC = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState<string>('');

   const addNewTodo = (message: string) => {
        dispatch(addTodoCall({
            message: message,
            done: false,
        }));
    };

    const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addNewTodo(message);
        setMessage('');
    };

    return (
        <form onSubmit={onFormSubmit}>
            <TextField
                placeholder="Todo:"
                value={message}
                onChange={onMessageChange}
            />
        </form>
    )
};
export default Input;
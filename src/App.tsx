import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { todosSelector } from "./features/todo/TodoSlice";
import { getTodosCall } from "./app/sagas";
import Input from './features/todo/Input/Input';
import Error from './features/todo/Error/Error';
import TodoList from './features/todo/TodoList/TodoList';
import classes from './App.module.css';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const { todos, loading, error } = useSelector(todosSelector);

    useEffect(() => {
        dispatch(getTodosCall());
    }, [dispatch])

    return (
        <div className={classes.App}>
            {error && <Error error={error} />}
            {loading && !error && <CircularProgress />}
            {!loading && !error ?
                <>
                    <Input />
                    <TodoList todos={todos} />
                </>
                : null}
        </div>
    );
}

export default App;

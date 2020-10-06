import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todoReducer from '../features/todo/TodoSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const rootReducer = combineReducers({
    todo: todoReducer,
});

export default () => {
    const store = configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV === 'development',
        middleware,
    });
    sagaMiddleware.run(rootSaga);
    return store;
};
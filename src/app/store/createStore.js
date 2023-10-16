
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import qualitiesReducer from './qualities';
import professionsReducer from './professions';
import usersReducer from './users';
import commentsReducer from './comments';

const rootReducer = combineReducers({ qualitiesReducer, professionsReducer, usersReducer, commentsReducer });

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
};

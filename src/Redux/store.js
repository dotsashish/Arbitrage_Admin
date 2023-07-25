import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './Models/Auth/reducer';
import admin from './Models/Admin/reducer';
import application from './Models/Application/reducer'

const rootReducers = combineReducers(
    {
        application,admin,auth
    });

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)) );
export default store;

import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import CardReducer from '../Reducers/main/CardReducer';

const rootReducer = combineReducers(
    {
        CardReducer: CardReducer
    }
);
const configurestore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}
export default configurestore;
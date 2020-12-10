import {combineReducers} from 'redux';
import bookReducer from './Admin/bookReducer';

const rootReducer = combineReducers({
    book: bookReducer,
});

export default rootReducer;
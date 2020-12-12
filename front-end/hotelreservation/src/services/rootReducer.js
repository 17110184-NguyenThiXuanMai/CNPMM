import {combineReducers} from 'redux';
import roomTypeReducer from './Admin/roomTypeReducer';

const rootReducer = combineReducers({
    roomType: roomTypeReducer,
});

export default rootReducer;
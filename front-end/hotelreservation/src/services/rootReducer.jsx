import {combineReducers} from 'redux';
import roomTypeReducer from './RoomType/roomTypeReducer';
import policyReducer from './Policy/policyReducer';

const rootReducer = combineReducers({
    roomType: roomTypeReducer,
    policy: policyReducer
});

export default rootReducer;
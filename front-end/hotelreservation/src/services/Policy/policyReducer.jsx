import {SAVE_SERVICE_REQUEST, FETCH_SERVICE_REQUEST, UPDATE_SERVICE_REQUEST, DELETE_SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE} from "./policy";
const initialState = {
    service: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_SERVICE_REQUEST || FETCH_SERVICE_REQUEST || UPDATE_SERVICE_REQUEST || DELETE_SERVICE_REQUEST:
            return {
                ...state
            };
        case SERVICE_SUCCESS:
            return {
                service: action.payload,
                error: ''
            };
        case SERVICE_FAILURE:
            return {
                service: '',
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;
import {SAVE_ROOMTYPE_REQUEST, FETCH_ROOMTYPE_REQUEST, UPDATE_ROOMTYPE_REQUEST, DELETE_ROOMTYPE_REQUEST, ROOMTYPE_SUCCESS, ROOMTYPE_FAILURE} from "./roomTypes";

const initialState = {
    roomType: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_ROOMTYPE_REQUEST || FETCH_ROOMTYPE_REQUEST || UPDATE_ROOMTYPE_REQUEST || DELETE_ROOMTYPE_REQUEST:
            return {
                ...state
            };
        case ROOMTYPE_SUCCESS:
            return {
                roomType: action.payload,
                error: ''
            };
        case ROOMTYPE_FAILURE:
            return {
                roomType: '',
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;
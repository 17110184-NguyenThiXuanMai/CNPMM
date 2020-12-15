import {SAVE_POLICY_REQUEST, FETCH_POLICY_REQUEST, UPDATE_POLICY_REQUEST, DELETE_POLICY_REQUEST, POLICY_SUCCESS, POLICY_FAILURE} from "./policy";

const initialState = {
    policy: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_POLICY_REQUEST || FETCH_POLICY_REQUEST || UPDATE_POLICY_REQUEST || DELETE_POLICY_REQUEST:
            return {
                ...state
            };
        case POLICY_SUCCESS:
            return {
                policy: action.payload,
                error: ''
            };
        case POLICY_FAILURE:
            return {
                policy: '',
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;
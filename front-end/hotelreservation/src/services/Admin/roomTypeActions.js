import {SAVE_ROOMTYPE_REQUEST, FETCH_ROOMTYPE_REQUEST, UPDATE_ROOMTYPE_REQUEST, DELETE_ROOMTYPE_REQUEST, ROOMTYPE_SUCCESS, ROOMTYPE_FAILURE} from "./roomTypes";
import axios from 'axios';

export const saveRoomType = roomType => {
    return dispatch => {
        dispatch(saveRoomTypeRequest());
        axios.post("http://localhost:8080/api/test/roomtypes", roomType)
            .then(response => {
                dispatch(roomTypeSuccess(response.data));
            })
            .catch(error => {
                dispatch(roomTypeFailure(error));
            });
    };
};

const saveRoomTypeRequest = () => {
    return {
        type: SAVE_ROOMTYPE_REQUEST
    };
};

const fetchRoomTypeRequest = () => {
    return {
        type: FETCH_ROOMTYPE_REQUEST
    };
};

export const fetchRoomType = roomTypeId => {
    return dispatch => {
        dispatch(fetchRoomTypeRequest());
        axios.get("http://localhost:8080/api/test/roomtypes/"+roomTypeId)
            .then(response => {
                dispatch(roomTypeSuccess(response.data));
            })
            .catch(error => {
                dispatch(roomTypeFailure(error));
            });
    };
};

const updateRoomTypeRequest = () => {
    return {
        type: UPDATE_ROOMTYPE_REQUEST
    };
};

export const updateRoomType = roomType => {
    return dispatch => {
        dispatch(updateRoomTypeRequest());
        axios.put("http://localhost:8080/api/test/roomtypes", roomType)
            .then(response => {
                dispatch(roomTypeSuccess(response.data));
            })
            .catch(error => {
                dispatch(roomTypeFailure(error));
            });
    };
};

const deleteRoomTypeRequest = () => {
    return {
        type: DELETE_ROOMTYPE_REQUEST
    };
};

export const deleteRoomType = roomTypeId => {
    return dispatch => {
        dispatch(deleteRoomTypeRequest());
        axios.delete("http://localhost:8080/api/test/roomtypes/"+ roomTypeId)
            .then(response => {
                dispatch(roomTypeSuccess(response.data));
            })
            .catch(error => {
                dispatch(roomTypeFailure(error));
            });
    };
};

const roomTypeSuccess = roomType => {
    return {
        type: ROOMTYPE_SUCCESS,
        payload: roomType
    };
};

const roomTypeFailure = error => {
    return {
        type: ROOMTYPE_FAILURE,
        payload: error
    };
};
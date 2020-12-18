import {SAVE_SERVICE_REQUEST, FETCH_SERVICE_REQUEST, UPDATE_SERVICE_REQUEST, DELETE_SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE} from "./policy";
import axios from 'axios';
import { Callbacks } from "jquery";

export const saveService = (service) => {
    return dispatch => {
        dispatch(saveServiceRequest());
        axios.post("http://localhost:8080/api/test/services", service)
            .then(response => {
                dispatch(serviceSuccess(response.data));

            })
            .catch(error => {
                dispatch(serviceFailure(error));
            });
    };
};

const saveServiceRequest = () => {
    return {
        type: SAVE_SERVICE_REQUEST
    };
};

const fetchServiceRequest = () => {
    return {
        type: FETCH_SERVICE_REQUEST
    };
};

export const fetchService = serviceId => {
    return dispatch => {
        dispatch(fetchServiceRequest());
        axios.get("http://localhost:8080/api/test/services/"+serviceId)
            .then(response => {
                dispatch(serviceSuccess(response.data));
            })
            .catch(error => {
                dispatch(serviceFailure(error));
            });
    };
};

const updateServiceRequest = () => {
    return {
        type: UPDATE_SERVICE_REQUEST
    };
};

export const updateService = service => {
    return dispatch => {
        dispatch(updateServiceRequest());
        axios.put("http://localhost:8080/api/test/services", service)
            .then(response => {
                dispatch(serviceSuccess(response.data));
            })
            .catch(error => {
                dispatch(serviceFailure(error));
            });
    };
};

const deleteServiceRequest = () => {
    return {
        type: DELETE_SERVICE_REQUEST
    };
};

export const deleteService = serviceId => {
    return dispatch => {
        dispatch(deleteServiceRequest());
        axios.delete("http://localhost:8080/api/test/services/"+ serviceId)
            .then(response => {
                dispatch(serviceSuccess(response.data));
            })
            .catch(error => {
                dispatch(serviceFailure(error));
            });
    };
};

const serviceSuccess = service => {
    return {
        type: SERVICE_SUCCESS,
        payload: service
    };
};

const serviceFailure = error => {
    return {
        type: SERVICE_FAILURE,
        payload: error
    };
};
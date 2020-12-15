import {SAVE_POLICY_REQUEST, FETCH_POLICY_REQUEST, UPDATE_POLICY_REQUEST, DELETE_POLICY_REQUEST, POLICY_SUCCESS, POLICY_FAILURE} from "./policy";
import axios from 'axios';

export const savePolicy = policy => {
    return dispatch => {
        dispatch(savePolicyRequest());
        axios.post("http://localhost:8080/api/test/policies", policy)
            .then(response => {
                dispatch(policySuccess(response.data));
            })
            .catch(error => {
                dispatch(policyFailure(error));
            });
    };
};

const savePolicyRequest = () => {
    return {
        type: SAVE_POLICY_REQUEST
    };
};

const fetchPolicyRequest = () => {
    return {
        type: FETCH_POLICY_REQUEST
    };
};

export const fetchPolicy = policyId => {
    return dispatch => {
        dispatch(fetchPolicyRequest());
        axios.get("http://localhost:8080/api/test/policies/"+policyId)
            .then(response => {
                dispatch(policySuccess(response.data));
            })
            .catch(error => {
                dispatch(policyFailure(error));
            });
    };
};

const updatePolicyRequest = () => {
    return {
        type: UPDATE_POLICY_REQUEST
    };
};

export const updatePolicy = policy => {
    return dispatch => {
        dispatch(updatePolicyRequest());
        axios.put("http://localhost:8080/api/test/policies", policy)
            .then(response => {
                dispatch(policySuccess(response.data));
            })
            .catch(error => {
                dispatch(policyFailure(error));
            });
    };
};

const deletePolicyRequest = () => {
    return {
        type: DELETE_POLICY_REQUEST
    };
};

export const deletePolicy = policyId => {
    return dispatch => {
        dispatch(deletePolicyRequest());
        axios.delete("http://localhost:8080/api/test/policies/"+ policyId)
            .then(response => {
                dispatch(policySuccess(response.data));
            })
            .catch(error => {
                dispatch(policyFailure(error));
            });
    };
};

const policySuccess = policy => {
    return {
        type: POLICY_SUCCESS,
        payload: policy
    };
};

const policyFailure = error => {
    return {
        type: POLICY_FAILURE,
        payload: error
    };
};
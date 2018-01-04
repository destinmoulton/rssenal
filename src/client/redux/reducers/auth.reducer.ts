import {
    AUTH_ERROR,
    AUTH_USER_IS_AUTHENTIC,
    AUTH_LOGOUT,
    AUTH_TOKEN_IS_VALIDATING,
    AUTH_TOKEN_VALIDATION_COMPLETE
} from "../actiontypes";
import { IAuthAction, IReducerStateAuth } from "../../interfaces";

const INITIAL_STATE: IReducerStateAuth = {
    authenticationError: "",
    isAuthorized: false,
    isValidatingToken: false
};

const authReducer = (state = INITIAL_STATE, action: IAuthAction) => {
    switch (action.type) {
        case AUTH_ERROR:
            return {
                ...state,
                authenticationError: action.message
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isAuthorized: false
            };
        case AUTH_TOKEN_IS_VALIDATING:
            return {
                ...state,
                isValidatingToken: true
            };
        case AUTH_TOKEN_VALIDATION_COMPLETE:
            return {
                ...state,
                isValidatingToken: false
            };
        case AUTH_USER_IS_AUTHENTIC:
            return {
                ...state,
                authenticationError: "",
                isAuthorized: true
            };
        default:
            return { ...state };
    }
};

export default authReducer;

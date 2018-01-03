import {
    AUTH_ERROR,
    AUTH_USER_IS_AUTHENTIC,
    AUTH_LOGOUT
} from "../actiontypes";
import { IAuthAction, IReducerStateAuth } from "../../interfaces";

const INITIAL_STATE: IReducerStateAuth = {
    authenticationError: "",
    isAuthorized: false,
    jwtSecret: ""
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
                isAuthorized: false,
                jwtSecret: ""
            };
        case AUTH_USER_IS_AUTHENTIC:
            return {
                ...state,
                authenticationError: "",
                isAuthorized: true,
                jwtSecret: action.username + action.password
            };
        default:
            return { ...state };
    }
};

export default authReducer;

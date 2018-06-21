import * as ACT_TYPES from "../actiontypes";
import { IAuthAction, IReducerStateAuth } from "../../types";

const INITIAL_STATE: IReducerStateAuth = {
    authenticationError: "",
    isAuthorized: false,
    isValidatingToken: false
};

const authReducer = (state = INITIAL_STATE, action: IAuthAction) => {
    switch (action.type) {
        case ACT_TYPES.AUTH_ERROR:
            return {
                ...state,
                authenticationError: action.message
            };
        case ACT_TYPES.AUTH_LOGOUT:
            return {
                ...state,
                isAuthorized: false
            };
        case ACT_TYPES.AUTH_USER_IS_AUTHENTIC:
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

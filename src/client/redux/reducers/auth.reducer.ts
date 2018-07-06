import * as ACT_TYPES from "../actiontypes";
import { IAuthAction } from "../../types";
import { AUTH_INITIAL_STATE } from "../initialstate";

const authReducer = (state = AUTH_INITIAL_STATE, action: IAuthAction) => {
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

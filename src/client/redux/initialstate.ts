import * as Types from "../types";

export const AUTH_INITIAL_STATE: Types.IReducerStateAuth = {
    authenticationError: "",
    isAuthorized: false,
    isValidatingToken: false
};

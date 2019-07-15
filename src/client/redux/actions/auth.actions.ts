import storage from "../../lib/storage";
import {
    AUTH_ERROR,
    AUTH_LOGOUT,
    AUTH_USER_IS_AUTHENTIC
} from "../actiontypes";
import * as AuthServices from "../services/auth.services";
import { IDispatch } from "../../types";

export function authValidateToken() {
    return async (dispatch: IDispatch) => {
        try {
            await AuthServices.apiValidateToken();
            dispatch(userIsAuthentic());
        } catch (err) {
            dispatch(authLogoutUser());
        }
    };
}

export function authLoginUser(username: string, password: string) {
    return async (dispatch: IDispatch) => {
        try {
            const token = await AuthServices.apiLoginUser(username, password);
            storage.set("jwt_token", token);
            dispatch(userIsAuthentic());
        } catch (err) {
            dispatch(
                authenticationError("Unable to find that username or password.")
            );
        }
    };
}

function userIsAuthentic() {
    return {
        type: AUTH_USER_IS_AUTHENTIC
    };
}

function authenticationError(message: string) {
    return {
        type: AUTH_ERROR,
        message
    };
}

export function authLogoutUser() {
    storage.remove("jwt_token");
    return {
        type: AUTH_LOGOUT
    };
}

import { API_AUTH_LOGIN, API_AUTH_VALIDATE_TOKEN } from "../apiendpoints";
import { generateJSONHeaders, generateJWTHeaders } from "../../lib/headers";
import storage from "../../lib/storage";
import {
    AUTH_ERROR,
    AUTH_LOGOUT,
    AUTH_USER_IS_AUTHENTIC
} from "../actiontypes";

import { IDispatch } from "../../types";

export function authValidateToken() {
    return (dispatch: IDispatch) => {
        const url = API_AUTH_VALIDATE_TOKEN;
        const init = {
            method: "GET",
            headers: generateJWTHeaders()
        };
        return fetch(url, init)
            .then(res => {
                if (!res.ok) {
                    return { status: "invalid" };
                }

                return res.json();
            })
            .then(auth => {
                if (auth.status === "valid") {
                    dispatch(userIsAuthentic());
                } else {
                    dispatch(authLogoutUser());
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

export function authLoginUser(username: string, password: string) {
    return (dispatch: IDispatch) => {
        const url = API_AUTH_LOGIN;
        const init = {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: generateJSONHeaders()
        };

        return fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(auth => {
                if (auth.status === "success") {
                    storage.set("jwt_token", auth.token);
                    dispatch(userIsAuthentic());
                } else {
                    dispatch(
                        authenticationError(
                            "Unable to find that username or password."
                        )
                    );
                }
            })
            .catch(err => {});
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

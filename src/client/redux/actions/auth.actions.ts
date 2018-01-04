import { API_AUTH } from "../apiendpoints";
import { JSON_HEADERS } from "../../lib/headers";

import {
    AUTH_ERROR,
    AUTH_LOGOUT,
    AUTH_USER_IS_AUTHENTIC
} from "../actiontypes";

import { IDispatch } from "../../interfaces";

export function loginUser(username: string, password: string) {
    return (dispatch: IDispatch) => {
        const url = API_AUTH;
        const init = {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: JSON_HEADERS
        };

        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(auth => {
                if (auth.status === "success") {
                    localStorage.setItem("jwt_token", auth.token);
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

export function userIsAuthentic() {
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

export function logoutUser() {
    localStorage.removeItem("jwt_token");
    return {
        type: AUTH_LOGOUT
    };
}

import { API_AUTH } from "../apiendpoints";
import { JSON_HEADERS } from "../../lib/headers";

import {
    AUTH_ERROR,
    AUTH_LOGOUT,
    AUTH_USER_IS_AUTHENTIC
} from "../actiontypes";

import { IDispatch } from "../../interfaces";

export function authenticateUser(username: string, password: string) {
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
                    dispatch(userAuthenticated(username, password));
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

function userAuthenticated(username: string, password: string) {
    return {
        type: AUTH_USER_IS_AUTHENTIC,
        username,
        password
    };
}

function authenticationError(message: string) {
    return {
        type: AUTH_ERROR,
        message
    };
}

export function logoutUser() {
    return {
        type: AUTH_LOGOUT
    };
}

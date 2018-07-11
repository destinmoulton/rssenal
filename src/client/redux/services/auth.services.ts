import { API_AUTH_LOGIN, API_AUTH_VALIDATE_TOKEN } from "../apiendpoints";

import {
    generateJWTJSONHeaders,
    generateJSONHeaders,
    generateJWTHeaders
} from "../../lib/headers";
import * as Types from "../../types";

export async function apiValidateToken() {
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
                return true;
            } else {
                throw new Error("User not logged in.");
            }
        })
        .catch(err => {
            throw err;
        });
}

export async function apiLoginUser(username: string, password: string) {
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
                return auth.token;
            } else {
                throw new Error("Invalid username or password.");
            }
        })
        .catch(err => {
            throw err;
        });
}

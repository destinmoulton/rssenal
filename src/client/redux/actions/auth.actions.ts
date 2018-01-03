import { API_AUTH } from "../apiendpoints";
import { JSON_HEADERS } from "../../lib/headers";

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
                if (auth.isAuthorized) {
                }
            })
            .catch(err => {});
    };
}

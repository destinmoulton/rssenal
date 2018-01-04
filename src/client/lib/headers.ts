let jsonHeaders = new Headers();
jsonHeaders.append("Accept", "application/json");
jsonHeaders.append("Content-Type", "application/json");

export const JSON_HEADERS = jsonHeaders;

// Build the jwt header for json access
export function generateJWTJSONHeaders() {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    const jwt_token = localStorage.getItem("jwt_token");
    if (jwt_token) {
        headers.append("Authorization", `Bearer ${jwt_token}`);
    }
    return headers;
}

//Build the jwt header for general access
export function generateJWTHeaders() {
    let headers = new Headers();
    const jwt_token = localStorage.getItem("jwt_token");
    if (jwt_token) {
        headers.append("Authorization", `Bearer ${jwt_token}`);
    }
    return headers;
}

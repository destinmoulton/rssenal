import storage from "./storage";

export function generateJSONHeaders() {
    let jsonHeaders = new Headers();
    jsonHeaders.append("Accept", "application/json");
    jsonHeaders.append("Content-Type", "application/json");
    return jsonHeaders;
}

// Build the jwt header for json access
export function generateJWTJSONHeaders() {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    if (storage.has("jwt_token")) {
        const jwt_token = storage.get("jwt_token");
        headers.append("Authorization", `Bearer ${jwt_token}`);
    }
    return headers;
}

//Build the jwt header for general access
export function generateJWTHeaders() {
    let headers = new Headers();

    if (storage.has("jwt_token")) {
        const jwt_token = storage.get("jwt_token");
        headers.append("Authorization", `Bearer ${jwt_token}`);
    }
    return headers;
}

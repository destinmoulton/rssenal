import {
    generateJSONHeaders,
    generateJWTHeaders,
    generateJWTJSONHeaders
} from "../headers";

describe("lib/headers.ts", () => {
    it("generateJSONHeaders()", () => {
        const headers = generateJSONHeaders();
        expect(headers).toMatchSnapshot();
    });

    it("generateJWTHeaders()", () => {
        localStorage.setItem("jwt_token", "TEST_JWT_TOKEN");
        const headers = generateJWTHeaders();

        expect(headers).toMatchSnapshot();
    });

    it("generateJWTJSONHeaders()", () => {
        localStorage.setItem("jwt_token", "TEST_JWT_TOKEN");
        const headers = generateJWTJSONHeaders();
        expect(headers).toMatchSnapshot();
    });
});

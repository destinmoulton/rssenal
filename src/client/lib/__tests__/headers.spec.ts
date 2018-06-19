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
});

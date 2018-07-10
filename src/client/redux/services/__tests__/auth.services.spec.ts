import * as fetchMock from "fetch-mock";

import * as AuthServices from "../auth.services";

describe("auth.services", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    describe("apiValidateToken()", () => {
        it("throws when the token is invalid", async () => {
            localStorage.setItem("jwt_token", "TEST_TOKEN");
            fetchMock.getOnce("/api/auth/validatetoken", {
                body: {},
                status: 400
            });

            expect.assertions(2);
            try {
                await AuthServices.apiValidateToken();
            } catch (err) {
                expect(fetchMock.done()).toBe(true);
                expect(err).toEqual(new Error("User not logged in."));
            }
        });

        it("returns true when token valid", async () => {
            localStorage.setItem("jwt_token", "TEST_TOKEN");
            fetchMock.getOnce("/api/auth/validatetoken", {
                body: { status: "valid" }
            });

            expect.assertions(2);
            try {
                const validated = await AuthServices.apiValidateToken();
                expect(fetchMock.done()).toBe(true);
                expect(validated).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });
});

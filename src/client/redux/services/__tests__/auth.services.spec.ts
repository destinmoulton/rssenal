import * as fetchMock from "fetch-mock";

import * as AuthServices from "../auth.services";

describe("auth.services", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    describe("apiValidateToken()", async () => {
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
                expect(validated).toBe(true);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("apiLoginUser()", () => {
        it("throws on invalid username/password", async () => {
            fetchMock.postOnce("/api/auth/login", {
                body: { status: "error" }
            });

            expect.assertions(2);
            try {
                await AuthServices.apiLoginUser("testu", "testp");
            } catch (err) {
                expect(err).toEqual(new Error("Invalid username or password."));

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns true on valid username/password", async () => {
            fetchMock.postOnce("/api/auth/login", {
                body: { status: "success", token: "NEWTOKEN" }
            });

            expect.assertions(2);
            try {
                const ret = await AuthServices.apiLoginUser("testu", "testp");
                expect(ret).toBe("NEWTOKEN");

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });
});

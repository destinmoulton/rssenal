import * as fetchMock from "fetch-mock";

describe("auth.services", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it("apiValidateToken()", () => {
        fetchMock.getOnce("/api/auth/validatetoken", {
            body: {},
            status: 400
        });
    });
});

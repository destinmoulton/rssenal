import * as fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as AuthActions from "../auth.actions";
import * as ACT_TYPES from "../../actiontypes";
import { AUTH_INITIAL_STATE } from "../../initialstate";
import * as Types from "../../../types";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("auth.actions", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    it("authValidateToken() fetches and handles an invalid response", async () => {
        fetchMock.getOnce("/api/auth/validatetoken", {
            body: {},
            status: 400
        });

        const expectedActions = [{ type: ACT_TYPES.AUTH_LOGOUT }];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });

        try {
            await store.dispatch(AuthActions.authValidateToken());
            expect(store.getActions()).toEqual(expectedActions);

            await fetchMock.flush();
            expect(fetchMock.done()).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    it("authValidateToken() fetches and handles a valid token", async () => {
        fetchMock.getOnce("/api/auth/validatetoken", {
            body: { status: "valid" },
            status: 200
        });

        const expectedActions = [{ type: ACT_TYPES.AUTH_USER_IS_AUTHENTIC }];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });
        try {
            await store.dispatch(AuthActions.authValidateToken());
            await fetchMock.flush();
            expect(store.getActions()).toEqual(expectedActions);
            expect(fetchMock.done()).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    it("authValidateToken() fetches and handles an invalid token", async () => {
        fetchMock.getOnce("/api/auth/validatetoken", {
            body: { status: "invalid" },
            status: 200
        });

        const expectedActions = [{ type: ACT_TYPES.AUTH_LOGOUT }];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });
        try {
            await store.dispatch(AuthActions.authValidateToken());
            expect(store.getActions()).toEqual(expectedActions);

            await fetchMock.flush();
            expect(fetchMock.done()).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    it("authLoginUser() errors when invalid credentials are passed", async () => {
        fetchMock.postOnce("/api/auth/login", {
            body: { status: "error" },
            status: 200
        });

        const expectedActions = [
            {
                type: ACT_TYPES.AUTH_ERROR,
                message: "Unable to find that username or password."
            }
        ];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });
        try {
            await store.dispatch(
                AuthActions.authLoginUser("TESTUSER", "TESTPASS")
            );
            expect(store.getActions()).toEqual(expectedActions);

            await fetchMock.flush();
            expect(fetchMock.done()).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    it("authLoginUser() authenticates when the credentials are correct", async () => {
        const testToken = "TESTJWTTOKEN";
        fetchMock.postOnce("/api/auth/login", {
            body: { status: "success", token: testToken },
            status: 200
        });

        const expectedActions = [
            {
                type: ACT_TYPES.AUTH_USER_IS_AUTHENTIC
            }
        ];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });
        try {
            await store.dispatch(
                AuthActions.authLoginUser("TESTUSER", "TESTPASS")
            );

            expect(store.getActions()).toEqual(expectedActions);
            expect(localStorage.getItem("jwt_token")).toBe(testToken);

            await fetchMock.flush();
            expect(fetchMock.done()).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    it("authLogoutUser() logs out the user", () => {
        const testToken = "TESTJWTTOKEN";
        const expectedActions = [
            {
                type: ACT_TYPES.AUTH_LOGOUT
            }
        ];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });
        localStorage.setItem("jwt_token", testToken);
        store.dispatch(AuthActions.authLogoutUser());
        expect(store.getActions()).toEqual(expectedActions);
        expect(localStorage.getItem("jwt_token")).toBe(null);
    });
});

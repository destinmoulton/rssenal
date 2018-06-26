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
    });

    it("authValidateToken() fetches and handles an invalid response", () => {
        fetchMock.getOnce("/api/auth/validatetoken", {
            body: {},
            status: 400
        });

        const expectedActions = [{ type: ACT_TYPES.AUTH_LOGOUT }];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });
        return store.dispatch(AuthActions.authValidateToken()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("authValidateToken() fetches and handles a valid token", () => {
        fetchMock.getOnce("/api/auth/validatetoken", {
            body: { status: "valid" },
            status: 200
        });

        const expectedActions = [{ type: ACT_TYPES.AUTH_USER_IS_AUTHENTIC }];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });
        return store.dispatch(AuthActions.authValidateToken()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("authValidateToken() fetches and handles an invalid token", () => {
        fetchMock.getOnce("/api/auth/validatetoken", {
            body: { status: "invalid" },
            status: 200
        });

        const expectedActions = [{ type: ACT_TYPES.AUTH_LOGOUT }];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });
        return store.dispatch(AuthActions.authValidateToken()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("authLoginUser() errors when invalid credentials are passed", () => {
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
        return store
            .dispatch(AuthActions.authLoginUser("TESTUSER", "TESTPASS"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("authLoginUser() authenticates when the credentials are correct", () => {
        fetchMock.postOnce("/api/auth/login", {
            body: { status: "success" },
            status: 200
        });

        const expectedActions = [
            {
                type: ACT_TYPES.AUTH_USER_IS_AUTHENTIC
            }
        ];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });
        return store
            .dispatch(AuthActions.authLoginUser("TESTUSER", "TESTPASS"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("authLogoutUser() logs out the user", () => {
        const expectedActions = [
            {
                type: ACT_TYPES.AUTH_LOGOUT
            }
        ];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });
        store.dispatch(AuthActions.authLogoutUser());
        expect(store.getActions()).toEqual(expectedActions);
    });
});

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

    it("", () => {
        fetchMock.getOnce("/api/auth/validatetoken", {
            body: { status: "valid" },
            method: "GET"
        });

        const expectedActions = [{ type: ACT_TYPES.AUTH_USER_IS_AUTHENTIC }];

        const store = mockStore({ authStore: AUTH_INITIAL_STATE });
        return store.dispatch(AuthActions.authValidateToken()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

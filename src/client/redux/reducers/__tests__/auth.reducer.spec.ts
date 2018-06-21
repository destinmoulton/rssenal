import * as ACT_TYPES from "../../actiontypes";

import authReducer from "../auth.reducer";

import { AUTH_INITIAL_STATE } from "../../initialstate";

describe("auth reducer", () => {
    it("should return initial state", () => {
        const reduction = authReducer(undefined, { type: null });

        expect(reduction).toEqual(AUTH_INITIAL_STATE);
    });

    it("should handle AUTH_ERROR", () => {
        const message = "Test Auth Error";
        const action = {
            type: ACT_TYPES.AUTH_ERROR,
            message
        };
        const reduction = authReducer(undefined, action);
        expect(reduction).toEqual({
            authenticationError: message,
            isAuthorized: false,
            isValidatingToken: false
        });
    });

    it("should handle AUTH_LOGOUT", () => {});

    it("should handle AUTH_USER_IS_AUTHENTIC", () => {});
});

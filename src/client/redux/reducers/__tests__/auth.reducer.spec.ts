import * as ACT_TYPES from "../../actiontypes";

import authReducer from "../auth.reducer";

import { AUTH_INITIAL_STATE } from "../../initialstate";

describe("auth reducer", () => {
    it("should return initial state", () => {
        const reduction = authReducer(undefined, { type: null });

        expect(reduction).toEqual(AUTH_INITIAL_STATE);
    });
});

import * as ACT_TYPES from "../../actiontypes";

import entriesReducer from "../entries.reducer";

import { ENTRIES_INITIAL_STATE } from "../../initialstate";

describe("auth reducer", () => {
    it("should return initial state", () => {
        const reduction = entriesReducer(undefined, { type: null });

        expect(reduction).toEqual(ENTRIES_INITIAL_STATE);
    });
});

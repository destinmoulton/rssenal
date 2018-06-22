import * as ACT_TYPES from "../../actiontypes";

import entriesReducer from "../entries.reducer";

import { ENTRIES_INITIAL_STATE } from "../../initialstate";
import DATA_ENTRIES from "../../../../../test/data/entries";
describe("entries reducer", () => {
    it("should return initial state", () => {
        const reduction = entriesReducer(undefined, { type: null });

        expect(reduction).toEqual(ENTRIES_INITIAL_STATE);
    });

    it("should handle ENTRIES_SET_ALL", () => {
        const action = {
            type: ACT_TYPES.ENTRIES_SET_ALL,
            entries: DATA_ENTRIES
        };
        const reduction = entriesReducer(undefined, action);
        expect(reduction).toEqual({
            entries: DATA_ENTRIES
        });
    });
});

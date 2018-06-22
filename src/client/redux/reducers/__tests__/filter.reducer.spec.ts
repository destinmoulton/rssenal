import * as ACT_TYPES from "../../actiontypes";
import DATA_ENTRIES from "../../../../../test/data/entries";
import * as Types from "../../../types";
import filterReducer from "../filter.reducer";

import { FILTER_INITIAL_STATE } from "../../initialstate";

describe("filter reducer", () => {
    it("should return initial state", () => {
        const defaultAction = {
            type: null
        };
        const reduction = filterReducer(undefined, defaultAction);

        expect(reduction).toEqual(FILTER_INITIAL_STATE);
    });

    it("should reduce FILTER_CHANGE ", () => {
        const newFilter: Types.IFilter = {
            limit: "feed",
            id: "000"
        };
        const action = {
            type: ACT_TYPES.FILTER_CHANGE,
            newFilter,
            filterTitle: "Test Feed",
            filteredEntries: DATA_ENTRIES
        };

        const reduction = filterReducer(undefined, action);
        expect(reduction).toEqual({
            filter: newFilter,
            filterTitle: "Test Feed",
            filteredEntries: DATA_ENTRIES
        });
    });

    it("should reduce FILTER_RESET", () => {
        const action = {
            type: ACT_TYPES.FILTER_RESET
        };

        const reduction = filterReducer(undefined, action);
        expect(reduction).toEqual(FILTER_INITIAL_STATE);
    });
});

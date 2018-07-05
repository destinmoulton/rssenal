import * as ACT_TYPES from "../../actiontypes";
import DATA_ENTRIES from "../../../../../test/data/immutable/ammendedEntries";
import * as Types from "../../../types";
import filterReducer from "../filter.reducer";

import { FILTER_INITIAL_STATE } from "../../initialstate";

const NEW_FILTER: Types.IFilter = {
    limit: "feed",
    id: "000"
};

describe("filter reducer", () => {
    it("should return initial state", () => {
        const defaultAction = {
            type: null
        };
        const reduction = filterReducer(undefined, defaultAction);

        expect(reduction).toEqual(FILTER_INITIAL_STATE);
    });

    it("should reduce FILTER_SET_DATA", () => {
        const action = {
            type: ACT_TYPES.FILTER_SET_DATA,
            filterTitle: "Test Feed",
            filteredEntries: DATA_ENTRIES
        };

        const reduction = filterReducer(undefined, action);
        expect(reduction).toEqual({
            filter: FILTER_INITIAL_STATE.filter,
            filterTitle: "Test Feed",
            filteredEntries: DATA_ENTRIES
        });
    });

    it("should reduce FILTER_CHANGE", () => {
        const action = {
            type: ACT_TYPES.FILTER_CHANGE,
            newFilter: NEW_FILTER
        };

        const reduction = filterReducer(undefined, action);
        expect(reduction).toEqual({
            filter: NEW_FILTER,
            filterTitle: "All",
            filteredEntries: FILTER_INITIAL_STATE.filteredEntries
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

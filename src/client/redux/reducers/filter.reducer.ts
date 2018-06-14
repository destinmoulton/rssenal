import { OrderedMap } from "immutable";
import { FILTER_CHANGE, FILTER_RESET } from "../actiontypes";

import * as Types from "../../types";

const INITIAL_STATE: Types.IReducerStateFilter = {
    filter: { limit: "folder", id: "all" },
    filterTitle: "All",
    filteredEntries: OrderedMap<Types.TEntryID, Types.IEntry>()
};

function filterReducer(state = INITIAL_STATE, action: Types.IFilterAction) {
    switch (action.type) {
        case FILTER_CHANGE: {
            return {
                ...state,
                filter: action.newFilter,
                filterTitle: action.filterTitle,
                filteredEntries: action.filteredEntries
            };
        }
        case FILTER_RESET: {
            return {
                ...INITIAL_STATE
            };
        }
        default:
            return {
                ...state
            };
    }
}

export default filterReducer;

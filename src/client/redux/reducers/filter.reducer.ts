import { FILTER_CHANGE, FILTER_RESET } from "../actiontypes";

import * as Types from "../../types";

import { FILTER_INITIAL_STATE } from "../initialstate";

function filterReducer(
    state = FILTER_INITIAL_STATE,
    action: Types.IFilterAction
) {
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
                ...FILTER_INITIAL_STATE
            };
        }
        default:
            return {
                ...state
            };
    }
}

export default filterReducer;

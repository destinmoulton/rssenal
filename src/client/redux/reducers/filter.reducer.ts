import * as ACT_TYPES from "../actiontypes";

import * as Types from "../../types";

import { FILTER_INITIAL_STATE } from "../initialstate";

function filterReducer(
    state = FILTER_INITIAL_STATE,
    action: Types.IFilterAction
) {
    switch (action.type) {
        case ACT_TYPES.FILTER_CHANGE: {
            return {
                ...state,
                filter: action.newFilter
            };
        }
        case ACT_TYPES.FILTER_SET_DATA: {
            return {
                ...state,
                filterTitle: action.filterTitle,
                filteredEntries: action.filteredEntries
            };
        }
        case ACT_TYPES.FILTER_RESET: {
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

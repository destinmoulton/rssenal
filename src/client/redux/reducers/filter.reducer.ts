import { FILTER_CHANGE, FILTER_RESET } from "../actiontypes";

import { IFilterAction, IReducerStateFilter } from "../../interfaces";

const INITIAL_STATE: IReducerStateFilter = {
    filter: { limit: "folder", id: "all" },
    filterTitle: "All"
};

function filterReducer(state = INITIAL_STATE, action: IFilterAction) {
    switch (action.type) {
        case FILTER_CHANGE: {
            return {
                ...state,
                filter: action.newFilter,
                filterTitle: action.filterTitle
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

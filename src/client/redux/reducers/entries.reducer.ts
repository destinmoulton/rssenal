import { ENTRIES_SET_ALL } from "../actiontypes";
import { ENTRIES_INITIAL_STATE } from "../initialstate";
import { IEntriesAction } from "../../types";

function entriesReducer(state = ENTRIES_INITIAL_STATE, action: IEntriesAction) {
    switch (action.type) {
        case ENTRIES_SET_ALL: {
            return {
                ...state,
                entries: action.entries
            };
        }

        default:
            return { ...state };
    }
}

export default entriesReducer;

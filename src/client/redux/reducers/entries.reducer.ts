import { OrderedMap } from "immutable";

import { ENTRIES_CLEAR_ALL, ENTRIES_SET_ALL } from "../actiontypes";

import {
    TEntryID,
    IEntry,
    IEntriesAction,
    IReducerStateEntries
} from "../../interfaces";

const INITIAL_STATE: IReducerStateEntries = {
    entries: OrderedMap<TEntryID, IEntry>()
};

function entriesReducer(state = INITIAL_STATE, action: IEntriesAction) {
    switch (action.type) {
        case ENTRIES_CLEAR_ALL: {
            return {
                ...state,
                entries: OrderedMap<TEntryID, IEntry>()
            };
        }
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

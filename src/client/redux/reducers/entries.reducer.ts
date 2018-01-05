import { OrderedMap } from "immutable";

import {
    ENTRIES_GET_COMPLETE,
    ENTRIES_MARKREAD_COMPLETE,
    ENTRIES_REMOVE_FEED
} from "../actiontypes";

import {
    TEntryID,
    IEntry,
    IEntriesAction,
    IReducerStateEntries
} from "../../interfaces";

const INITIAL_STATE: IReducerStateEntries = {
    entries: OrderedMap<TEntryID, IEntry>()
};

type IEntryTuple = [TEntryID, IEntry];

function entriesReducer(state = INITIAL_STATE, action: IEntriesAction) {
    switch (action.type) {
        case ENTRIES_GET_COMPLETE: {
            const { entries } = state;

            let newEntries = entries.toOrderedMap();
            action.entries.forEach(entry => {
                newEntries = newEntries.set(entry._id, entry);
            });

            return {
                ...state,
                entries: newEntries
            };
        }
        case ENTRIES_REMOVE_FEED:
            const { entries } = state;

            const newEntries = entries.filter((entry: IEntry) => {
                return entry.feed_id !== action.feedId;
            });

            return {
                ...state,
                entries: newEntries
            };

        case ENTRIES_MARKREAD_COMPLETE: {
            const { entries } = state;
            const newEntries = entries.set(
                action.newEntry._id,
                action.newEntry
            );
            return {
                ...state,
                entries: newEntries
            };
        }
        default:
            return { ...state };
    }
}

export default entriesReducer;

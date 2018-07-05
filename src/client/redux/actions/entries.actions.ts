import { OrderedMap } from "immutable";

import * as ACT_TYPES from "../actiontypes";
import * as EntriesServices from "../services/entries.services";
import { SETTING_SHOW_ENTRIES_READ } from "../../constants";
import { feedsDecrementUnread, feedsUpdateUnreadCount } from "./feeds.actions";
import { filterVisibleEntries } from "./filter.actions";

import * as Types from "../../types";

export function entriesGetForFeed(feedId: Types.TFeedID) {
    return async (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feedsStore, settingsStore } = getState();
        const currentFeed = feedsStore.feeds.get(feedId);

        const setting = settingsStore.settings.get(SETTING_SHOW_ENTRIES_READ);
        let shouldShowRead = setting.value;

        dispatch({ type: ACT_TYPES.ENTRIES_GET_ALL_REQUEST });

        try {
            const newEntries: Types.IEntry[] = await EntriesServices.apiGetEntriesForFeed(
                feedId,
                shouldShowRead
            );

            dispatch({ type: ACT_TYPES.ENTRIES_GET_ALL_SUCCESS });

            // Add data to the returned json
            const ammendedEntries = EntriesServices.ammendRawEntries(
                currentFeed,
                newEntries
            );

            const fullEntries = EntriesServices.addAmmendedEntries(
                getState().entriesStore.entries,
                ammendedEntries
            );

            dispatch(entriesSetAndFilter(fullEntries));
            dispatch(feedsUpdateUnreadCount(fullEntries));
        } catch (err) {
            dispatch({ type: ACT_TYPES.ENTRIES_GET_ALL_FAIL });
            console.error(err);
        }
    };
}

export function entryUpdateHasRead(entry: Types.IEntry, hasRead: boolean) {
    return async (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { entriesStore } = getState();
        const currentEntries = entriesStore.entries;

        try {
            await EntriesServices.apiUpdateEntryHasRead(entry, hasRead);

            const newEntries = EntriesServices.ammendEntryReadStatus(
                currentEntries,
                entry._id,
                hasRead
            );

            dispatch(feedsDecrementUnread(entry.feed_id));
            dispatch(entriesSetAndFilter(newEntries));
        } catch (err) {
            console.error(err);
        }
    };
}

export function entriesClearAll() {
    return (dispatch: Types.IDispatch) => {
        dispatch(
            entriesSetAndFilter(OrderedMap<Types.TEntryID, Types.IEntry>())
        );
    };
}

function entriesSetAndFilter(entries: Types.TEntries) {
    return (dispatch: Types.IDispatch) => {
        dispatch({
            type: ACT_TYPES.ENTRIES_SET_ALL,
            entries
        });

        dispatch(filterVisibleEntries());
    };
}

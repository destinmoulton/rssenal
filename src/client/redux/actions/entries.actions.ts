import { OrderedMap } from "immutable";

import { ENTRIES_SET_ALL } from "../actiontypes";
import * as EntriesServices from "../services/entries.services";
import { SETTING_SHOW_ENTRIES_READ } from "../../constants";
import { feedsDecrementUnread, feedsUpdateUnreadCount } from "./feeds.actions";
import { filterVisibleEntries } from "./filter.actions";

import * as Types from "../../types";

export function entriesGetAllForFeed(feedId: Types.TFeedID) {
    return async (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { entriesStore, feedsStore, settingsStore } = getState();
        const currentEntries = entriesStore.entries;
        const currentFeed = feedsStore.feeds.get(feedId);

        const setting = settingsStore.settings.get(SETTING_SHOW_ENTRIES_READ);
        let shouldShowRead = setting.value;

        const newEntries: Types.IEntry[] = await EntriesServices.getEntriesForFeed(
            feedId,
            shouldShowRead
        );

        const ammendedEntries = EntriesServices.ammendRawEntries(
            currentFeed,
            newEntries
        );

        const fullEntries = EntriesServices.addAmmendedEntries(
            currentEntries,
            ammendedEntries
        );

        dispatch(entriesSetAndFilter(fullEntries));
        dispatch(feedsUpdateUnreadCount(ammendedEntries));
    };
}

export function entryUpdateHasRead(entry: Types.IEntry, hasRead: boolean) {
    return async (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { entriesStore } = getState();
        const currentEntries = entriesStore.entries;
        await EntriesServices.updateEntryHasRead(entry, hasRead);

        const newEntries = EntriesServices.ammendEntryReadStatus(
            currentEntries,
            entry._id,
            hasRead
        );

        dispatch(feedsDecrementUnread(entry.feed_id));
        dispatch(entriesSetAndFilter(newEntries));
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
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { filterStore } = getState();
        dispatch(entriesSetAll(entries));
        dispatch(filterVisibleEntries(filterStore.filter, entries));
    };
}

function entriesSetAll(entries: Types.TEntries) {
    return {
        type: ENTRIES_SET_ALL,
        entries
    };
}

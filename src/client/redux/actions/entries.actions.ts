import { OrderedMap } from "immutable";
import * as moment from "moment";

import { ENTRIES_CLEAR_ALL, ENTRIES_SET_ALL } from "../actiontypes";

import { API_ENTRIES_BASE } from "../apiendpoints";

import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";
import { feedsDecrementUnread, feedsSetAllUnreadCount } from "./feeds.actions";
import { filterVisibleEntries } from "./filter.actions";
import { message } from "./messages.actions";

import {
    IDispatch,
    IEntry,
    IGetState,
    TFeedID,
    TEntryID,
    TEntries
} from "../../interfaces";

export function getEntriesForFeed(feedId: TFeedID) {
    return (dispatch: IDispatch, getState: IGetState) => {
        const { settingsStore } = getState();
        let showRead = false;
        settingsStore.settings.forEach(setting => {
            if (setting.key === "show_entries_has_read") {
                showRead = setting.value;
            }
        });

        const queryString =
            "?showEntriesHasRead=" + showRead + "&feedId=" + feedId;
        const url = API_ENTRIES_BASE + queryString;
        const init = {
            method: "GET",
            headers: generateJWTHeaders()
        };

        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(resObj => {
                if (resObj.status === "error") {
                    dispatch(message(resObj.error, "error"));
                    console.error(resObj.error);
                } else {
                    let entries = resObj.entries;
                    dispatch(ammendEntries(entries));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function ammendEntries(entries: IEntry[]) {
    return (dispatch: IDispatch, getState: IGetState) => {
        const { feedsStore, filterStore } = getState();

        const ammendedEntries = entries.map((entry: IEntry) => {
            const feedTitle = feedsStore.feeds.get(entry.feed_id).title;
            const timeAgo = moment(entry.publish_date).fromNow();
            return {
                ...entry,
                feedTitle,
                timeAgo
            };
        });
        dispatch(getEntriesComplete(ammendedEntries));

        dispatch(feedsSetAllUnreadCount(ammendedEntries));
    };
}

function getEntriesComplete(entries: IEntry[]) {
    return (dispatch: IDispatch, getState: IGetState) => {
        const { entriesStore, filterStore } = getState();
        const currentEntries = entriesStore.entries;

        let newEntries = currentEntries.toOrderedMap();
        entries.forEach(entry => {
            newEntries = newEntries.set(entry._id, entry);
        });

        dispatch(entriesSetAndFilter(newEntries));
    };
}

export function updateReadState(entry: IEntry, hasRead: boolean) {
    return (dispatch: IDispatch) => {
        const url = API_ENTRIES_BASE + entry._id;
        const init = {
            method: "PUT",
            body: JSON.stringify({ has_read: hasRead }),
            headers: generateJWTJSONHeaders()
        };

        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(resObj => {
                if (resObj.status === "error") {
                    console.error(resObj.error);
                } else {
                    dispatch(entryAmmendMarkRead(entry._id));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function entryAmmendMarkRead(entryId: TEntryID) {
    return (dispatch: IDispatch, getState: IGetState) => {
        const { entriesStore, filterStore } = getState();
        const allEntries = entriesStore.entries;
        const entry = allEntries.get(entryId);

        const newEntry = { ...entry, has_read: true };
        const newEntries = allEntries.set(entryId, newEntry);

        dispatch(feedsDecrementUnread(entry.feed_id));
        dispatch(entriesSetAndFilter(newEntries));
    };
}

export function entriesRemoveFeed(feedId: TFeedID) {
    return (dispatch: IDispatch, getState: IGetState) => {
        const { entriesStore } = getState();
        const { entries } = entriesStore;

        const newEntries = entries
            .filter((entry: IEntry) => {
                return entry.feed_id !== feedId;
            })
            .toOrderedMap();
        dispatch(entriesSetAndFilter(newEntries));
    };
}

function entriesSetAndFilter(entries: TEntries) {
    return (dispatch: IDispatch, getState: IGetState) => {
        const { filterStore } = getState();
        dispatch(entriesSetAll(entries));
        dispatch(filterVisibleEntries(filterStore.filter, entries));
    };
}

function entriesSetAll(entries: TEntries) {
    return {
        type: ENTRIES_SET_ALL,
        entries
    };
}

export function entriesClearAll() {
    return {
        type: ENTRIES_CLEAR_ALL
    };
}

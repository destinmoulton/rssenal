import { OrderedMap } from "immutable";
import * as moment from "moment";

import { ENTRIES_SET_ALL } from "../actiontypes";
import { API_ENTRIES_BASE } from "../apiendpoints";
import { SETTING_SHOW_ENTRIES_READ } from "../../constants";
import { feedsDecrementUnread, feedsUpdateUnreadCount } from "./feeds.actions";
import { filterVisibleEntries } from "./filter.actions";
import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";
import { message } from "./messages.actions";
import * as Types from "../../types";

export function entriesGetAllForFeed(feedId: Types.TFeedID) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { settingsStore } = getState();

        const setting = settingsStore.settings.get(SETTING_SHOW_ENTRIES_READ);
        let showRead = setting.value;

        const queryString =
            "?showEntriesHasRead=" + showRead + "&feedId=" + feedId;
        const url = API_ENTRIES_BASE + queryString;
        const init = {
            method: "GET",
            headers: generateJWTHeaders()
        };

        return fetch(url, init)
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

function ammendEntries(entries: Types.IEntry[]) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { entriesStore, feedsStore } = getState();
        const currentEntries = entriesStore.entries;
        const ammendedEntries = entries.map((entry: Types.IEntry) => {
            const feedTitle = feedsStore.feeds.get(entry.feed_id).title;
            const timeAgo = moment(entry.publish_date).fromNow();
            return {
                ...entry,
                feedTitle,
                timeAgo
            };
        });

        let newEntries = currentEntries.toOrderedMap();
        entries.forEach(entry => {
            newEntries = newEntries.set(entry._id, entry);
        });

        dispatch(entriesSetAndFilter(newEntries));
        dispatch(feedsUpdateUnreadCount(ammendedEntries));
    };
}

export function entryUpdateHasRead(entry: Types.IEntry, hasRead: boolean) {
    return (dispatch: Types.IDispatch) => {
        const url = API_ENTRIES_BASE + entry._id;
        const init = {
            method: "PUT",
            body: JSON.stringify({ has_read: hasRead }),
            headers: generateJWTJSONHeaders()
        };

        return fetch(url, init)
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

function entryAmmendMarkRead(entryId: Types.TEntryID) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { entriesStore } = getState();
        const allEntries = entriesStore.entries;
        const entry = allEntries.get(entryId);

        const newEntry = { ...entry, has_read: true };
        const newEntries = allEntries.set(entryId, newEntry);

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

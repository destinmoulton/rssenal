import * as moment from "moment";

import {
    ENTRIES_CLEAR_ALL,
    ENTRIES_GET_COMPLETE,
    ENTRIES_MARKREAD_COMPLETE,
    ENTRIES_UPDATE_BEGIN,
    ENTRIES_UPDATE_COMPLETE,
    ENTRIES_REMOVE_FEED
} from "../actiontypes";

import { API_ENTRIES_BASE } from "../apiendpoints";

import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";
import { feedsDecrementUnread, feedsSetAllUnreadCount } from "./feeds.actions";
import { message } from "./messages.actions";

import {
    IDispatch,
    IEntry,
    IGetState,
    TEntries,
    TFeedID,
    TEntryID
} from "../../interfaces";

export function getEntriesForFeed(feedId: TFeedID) {
    return (dispatch: IDispatch, getState: IGetState) => {
        const { settings } = getState();
        let showRead = false;
        settings.settings.forEach(setting => {
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
        const { feeds } = getState().feeds;
        const ammendedEntries = entries.map((entry: IEntry) => {
            const feedTitle = feeds.get(entry.feed_id).title;
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
    return {
        type: ENTRIES_GET_COMPLETE,
        entries
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
        const { entries } = getState().entries;

        const entry = entries.get(entryId);

        const newEntry = { ...entry, has_read: true };
        dispatch(feedsDecrementUnread(entry.feed_id));
        dispatch(entryMarkReadComplete(newEntry));
    };
}

function entryMarkReadComplete(newEntry: IEntry) {
    return {
        type: ENTRIES_MARKREAD_COMPLETE,
        newEntry
    };
}

export function entriesRemoveFeed(feedId: TFeedID) {
    return {
        type: ENTRIES_REMOVE_FEED,
        feedId
    };
}

export function entriesClearAll() {
    return {
        type: ENTRIES_CLEAR_ALL
    };
}

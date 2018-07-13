import * as moment from "moment";

import { API_ENTRIES_BASE } from "../apiendpoints";
import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";
import * as Types from "../../types";

export function apiGetEntriesForFeed(
    feedId: Types.TFeedID,
    shouldShowRead: boolean
) {
    console.log("running apiGetEntriesForFeed", feedId);
    const queryString = `?showEntriesHasRead=${shouldShowRead}&feedId=${feedId}`;
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
                throw new Error(resObj.error);
            } else if (Array.isArray(resObj.entries)) {
                return resObj.entries;
            }
        })
        .catch(err => {
            throw err;
        });
}

export function apiUpdateEntryHasRead(entry: Types.IEntry, hasRead: boolean) {
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
                throw new Error(resObj.error);
            } else {
                return true;
            }
        })
        .catch(err => {
            throw err;
        });
}

export function ammendRawEntries(
    currentFeed: Types.IFeed,
    rawEntries: Types.IEntry[]
): Types.IEntry[] {
    return rawEntries.map((entry: Types.IEntry) => {
        const feedTitle = currentFeed.title;
        const timeAgo = moment(entry.publish_date).fromNow();
        return {
            ...entry,
            feedTitle,
            timeAgo
        };
    });
}

export function addAmmendedEntries(
    currentEntries: Types.TEntries,
    ammendedEntries: Types.IEntry[]
) {
    let fullEntries = currentEntries.toOrderedMap();
    ammendedEntries.forEach(entry => {
        fullEntries = fullEntries.set(entry._id, entry);
    });
    return fullEntries;
}

export function ammendEntryReadStatus(
    currentEntries: Types.TEntries,
    entryId: Types.TEntryID,
    hasRead: boolean
): Types.TEntries {
    const entry = currentEntries.get(entryId);
    const newEntry = { ...entry, has_read: hasRead };
    return currentEntries.set(entryId, newEntry);
}

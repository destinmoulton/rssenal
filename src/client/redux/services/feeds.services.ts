import { OrderedMap } from "immutable";

import { API_FEEDS_BASE } from "../apiendpoints";
import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";
import { propertyComparator } from "../../lib/sort";
import * as Types from "../../types";

export async function apiAddFeed(feedInfo: Types.IFeed) {
    const url = API_FEEDS_BASE;
    const headers = generateJWTJSONHeaders();
    const init = {
        method: "POST",
        body: JSON.stringify({ ...feedInfo }),
        headers
    };

    return fetch(url, init)
        .then(res => {
            return res.json();
        })
        .then(feedObj => {
            if (feedObj.status === "error") {
                throw new Error(feedObj.error);
            } else if (feedObj.status === "success") {
                return feedObj.feedInfo;
            }
        })
        .catch(err => {
            throw err;
        });
}

export async function apiDeleteFeed(feedID: Types.TFeedID) {
    const url = API_FEEDS_BASE + feedID;
    const init = {
        method: "DELETE",
        headers: generateJWTHeaders()
    };
    return fetch(url, init)
        .then(res => {
            return res.json();
        })
        .then(resObj => {
            if (resObj.status === "error") {
                throw new Error(resObj.error);
            } else if (resObj.status === "success") {
                return true;
            }
        })
        .catch(err => {
            throw err;
        });
}

export async function apiGetAllFeeds() {
    const url = API_FEEDS_BASE;
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
            } else if (resObj.status === "success") {
                return resObj.feeds;
            }
        })
        .catch(err => {
            throw err;
        });
}

export async function apiUpdateFeed(feedInfo: Types.IFeed) {
    const url = API_FEEDS_BASE + feedInfo._id;
    const init = {
        method: "PUT",
        body: JSON.stringify({
            title: feedInfo.title,
            folder_id: feedInfo.folder_id
        }),
        headers: generateJWTJSONHeaders()
    };

    return fetch(url, init)
        .then(res => {
            return res.json();
        })
        .then(feedObj => {
            if (feedObj.status === "error") {
                throw new Error(feedObj.error);
            } else if (feedObj.status === "success") {
                return feedObj.feedInfo;
            }
        })
        .catch(err => {
            throw err;
        });
}

export function convertRawFeedsToOrderedMap(
    feedsArr: Types.IFeed[]
): Types.TFeeds {
    const feedsTuples = feedsArr.map(feed => {
        return [feed._id, feed];
    });
    return OrderedMap(feedsTuples);
}

export function updateUnreadCount(
    unreadMap: Types.IFeedsUnreadMap,
    entries: Types.TEntries,
    feeds: Types.TFeeds
) {
    let entriesCounted = unreadMap.entriesCounted;
    let unreadFeeds = unreadMap.feeds;
    let unreadFolders = unreadMap.folders;

    entries.map((entry: Types.IEntry) => {
        if (!entriesCounted.has(entry._id) && !entry.has_read) {
            entriesCounted = entriesCounted.add(entry._id);

            const feed = feeds.get(entry.feed_id);

            if (!unreadFeeds.has(feed._id)) {
                unreadFeeds = unreadFeeds.set(feed._id, 1);
            } else {
                const countUnread: number = unreadFeeds.get(feed._id);
                unreadFeeds = unreadFeeds.set(feed._id, countUnread + 1);
            }

            if (!unreadFolders.has(feed.folder_id)) {
                unreadFolders = unreadFolders.set(feed.folder_id, 1);
            } else {
                const countUnread: number = unreadFolders.get(feed.folder_id);
                unreadFolders = unreadFolders.set(
                    feed.folder_id,
                    countUnread + 1
                );
            }
        }
    });

    return {
        entriesCounted,
        feeds: unreadFeeds,
        folders: unreadFolders
    };
}

export function decrementUnread(
    feedId: Types.TFeedID,
    feeds: Types.TFeeds,
    unreadMap: Types.IFeedsUnreadMap
) {
    const feed = feeds.get(feedId);

    let unreadFeeds = unreadMap.feeds;
    let unreadFolders = unreadMap.folders;

    if (unreadFeeds.has(feedId)) {
        const unreadFeedCount = unreadFeeds.get(feedId);
        const newCount = unreadFeedCount > 1 ? unreadFeedCount - 1 : 0;
        unreadFeeds = unreadFeeds.set(feedId, newCount);
    }

    if (unreadFolders.has(feed.folder_id)) {
        const unreadFolderCount = unreadFolders.get(feed.folder_id);
        const newCount = unreadFolderCount > 1 ? unreadFolderCount - 1 : 0;
        unreadFolders = unreadFolders.set(feed.folder_id, newCount);
    }

    return {
        ...unreadMap,
        feeds: unreadFeeds,
        folders: unreadFolders
    };
}

export function setSingleFeed(feed: Types.IFeed, feeds: Types.TFeeds) {
    return feeds.set(feed._id, feed);
}

export function sortFeeds(feeds: Types.TFeeds): Types.TFeeds {
    return feeds
        .sort((a: Types.IFeed, b: Types.IFeed) =>
            propertyComparator(a, b, "asc", "title", true)
        )
        .toOrderedMap();
}

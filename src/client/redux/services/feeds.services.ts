import { OrderedMap } from "immutable";

import ky from "../../lib/ky";

import { API_FEEDS_BASE, API_FEEDVALIDATION_BASE } from "../apiendpoints";
import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";
import { propertyComparator } from "../../lib/sort";
import * as Types from "../../types";

export async function apiAddFeed(feedInfo: Types.IFeed) {
    const url = API_FEEDS_BASE;
    const headers = generateJWTJSONHeaders();
    const options = {
        json: { ...feedInfo },
        headers
    };

    return ky
        .post(url, options)
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
    const options = {
        headers: generateJWTHeaders()
    };
    return ky
        .delete(url, options)
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
    const options = {
        headers: generateJWTHeaders()
    };
    return ky
        .get(url, options)
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
    const options = {
        json: {
            title: feedInfo.title,
            folder_id: feedInfo.folder_id
        },
        headers: generateJWTJSONHeaders()
    };

    return ky
        .put(url, options)
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

export async function apiValidateFeedURL(urlToTest: string) {
    const url = API_FEEDVALIDATION_BASE;
    const init = {
        headers: generateJWTJSONHeaders(),
        json: { feedURL: urlToTest }
    };

    return ky
        .post(url, init)
        .then(res => {
            return res.json();
        })
        .then(resObj => {
            if (resObj.status === "error") {
                throw new Error(
                    "The feed address does not seem to be valid. Try again."
                );
            } else if (resObj.status === "success") {
                return resObj.feedInfo;
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

export function removeFeed(feedID: Types.TFeedID, feeds: Types.TFeeds) {
    return feeds.remove(feedID);
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

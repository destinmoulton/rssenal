import { OrderedMap } from "immutable";

import * as ACT_TYPES from "../actiontypes";
import { API_FEEDS_BASE } from "../apiendpoints";
import { entriesClearAll, entriesGetAllForFeed } from "./entries.actions";
import { filterReset } from "./filter.actions";
import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";
import { message } from "./messages.actions";
import { propertyComparator } from "../../lib/sort";
import * as Types from "../../types";

export function feedInitiateAdd(feedInfo: Types.IFeed) {
    return (dispatch: Types.IDispatch) => {
        dispatch(beginAddFeedProcess());
        dispatch(addFeed(feedInfo));
    };
}

function beginAddFeedProcess() {
    return {
        type: ACT_TYPES.FEEDS_ADD_BEGIN
    };
}

function addFeed(feedInfo: Types.IFeed) {
    return (dispatch: Types.IDispatch) => {
        const url = API_FEEDS_BASE;
        const headers = generateJWTJSONHeaders();
        const init = {
            method: "POST",
            body: JSON.stringify({ ...feedInfo }),
            headers
        };

        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(feedObj => {
                if (feedObj.status === "error") {
                    console.error(feedObj.error);
                } else if (feedObj.status === "success") {
                    dispatch(message("Feed added.", "success"));
                    dispatch(addFeedToOrderedMap(feedObj.feedInfo));
                    dispatch(entriesGetAllForFeed(feedObj.feedInfo._id));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function addFeedToOrderedMap(feed: Types.IFeed) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feeds } = getState().feedsStore;

        let newFeeds = feeds.set(feed._id, feed);
        newFeeds = sortFeeds(newFeeds);
        dispatch(addFeedComplete(newFeeds));
    };
}

function addFeedComplete(feeds: Types.TFeeds) {
    return {
        type: ACT_TYPES.FEEDS_ADD_COMPLETE,
        feeds
    };
}

export function feedsGetAll() {
    return (dispatch: Types.IDispatch) => {
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
                    dispatch(message(resObj.error, "error"));
                    console.error(resObj.error);
                } else if (resObj.status === "success") {
                    dispatch(convertAllFeedsToOrderedMap(resObj.feeds));
                    dispatch(getAllEntriesForFeeds(resObj.feeds));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function convertAllFeedsToOrderedMap(feedsArr: Types.IFeed[]) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const feedsTuples = feedsArr.map(feed => {
            return [feed._id, feed];
        });
        let feedsOrderedMap: Types.TFeeds = OrderedMap(feedsTuples);
        feedsOrderedMap = sortFeeds(feedsOrderedMap);
        dispatch(getAllFeedsComplete(feedsOrderedMap));
    };
}

function sortFeeds(feeds: Types.TFeeds): Types.TFeeds {
    return feeds
        .sort((a: Types.IFeed, b: Types.IFeed) =>
            propertyComparator(a, b, "asc", "title", true)
        )
        .toOrderedMap();
}

function getAllFeedsComplete(feeds: Types.TFeeds) {
    return {
        type: ACT_TYPES.FEEDS_GETALL_COMPLETE,
        feeds
    };
}

function getAllEntriesForFeeds(feeds: Types.IFeed[]) {
    return (dispatch: Types.IDispatch) => {
        dispatch(clearUnread());
        feeds.forEach(feed => {
            dispatch(entriesGetAllForFeed(feed._id));
        });
    };
}

function clearUnread() {
    return {
        type: ACT_TYPES.FEEDS_CLEAR_UNREAD
    };
}

export function feedsRefreshAll() {
    return (
        dispatch: Types.IDispatch,
        getState: () => Types.IRootStoreState
    ) => {
        const { feeds } = getState().feedsStore;
        dispatch(entriesClearAll());
        dispatch(getAllEntriesForFeeds(feeds.toArray()));
    };
}

export function beginDeleteFeed(feedId: Types.TFeedID) {
    return (dispatch: Types.IDispatch) => {
        dispatch(beginDeleteProcess());
        dispatch(deleteFeed(feedId));
    };
}

function beginDeleteProcess() {
    return {
        type: ACT_TYPES.FEEDS_DELETE_BEGIN
    };
}

function deleteFeed(feedId: Types.TFeedID) {
    return (dispatch: Types.IDispatch) => {
        const url = API_FEEDS_BASE + feedId;
        const init = {
            method: "DELETE",
            headers: generateJWTHeaders()
        };
        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(resObj => {
                dispatch(message("Feed removed.", "success"));
                dispatch(filterReset());
                dispatch(deleteFeedComplete(feedId));
                dispatch(feedsRefreshAll());
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function deleteFeedComplete(feedId: Types.TFeedID) {
    return {
        type: ACT_TYPES.FEEDS_DELETE_COMPLETE,
        feedId
    };
}

export function feedInitiateUpdate(feedInfo: Types.IFeed) {
    return (dispatch: Types.IDispatch) => {
        dispatch(beginUpdateFeedProcess());
        dispatch(updateFeed(feedInfo));
    };
}

function beginUpdateFeedProcess() {
    return {
        type: ACT_TYPES.FEEDS_UPDATE_BEGIN
    };
}

function updateFeed(feedInfo: Types.IFeed) {
    return (dispatch: Types.IDispatch) => {
        const url = API_FEEDS_BASE + feedInfo._id;
        const init = {
            method: "PUT",
            body: JSON.stringify({
                title: feedInfo.title,
                folder_id: feedInfo.folder_id
            }),
            headers: generateJWTJSONHeaders()
        };

        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(feedObj => {
                if (feedObj.status === "error") {
                    console.error(feedObj.error);
                } else if (feedObj.status === "success") {
                    dispatch(message("Feed saved.", "success"));
                    dispatch(applyUpdateFeed(feedObj.feedInfo));
                    dispatch(feedsGetAll());
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function applyUpdateFeed(feed: Types.IFeed) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feeds } = getState().feedsStore;

        let newFeeds = feeds.set(feed._id, feed);
        newFeeds = sortFeeds(newFeeds);
        dispatch(updateFeedComplete(newFeeds));
    };
}

function updateFeedComplete(feeds: Types.TFeeds) {
    return {
        type: ACT_TYPES.FEEDS_UPDATE_COMPLETE,
        feeds
    };
}

export function feedsUpdateUnreadCount(entries: Types.IEntry[]) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feeds, unreadMap } = getState().feedsStore;
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
                    const countUnread: number = unreadFolders.get(
                        feed.folder_id
                    );
                    unreadFolders = unreadFolders.set(
                        feed.folder_id,
                        countUnread + 1
                    );
                }
            }
        });

        const newUnreadMap = {
            entriesCounted,
            feeds: unreadFeeds,
            folders: unreadFolders
        };

        dispatch(feedsSetUnread(newUnreadMap));
    };
}

export function feedsDecrementUnread(feedId: Types.TFeedID) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feeds, unreadMap } = getState().feedsStore;
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

        const newUnreadMap = {
            ...unreadMap,
            feeds: unreadFeeds,
            folders: unreadFolders
        };
        dispatch(feedsSetUnread(newUnreadMap));
    };
}

function feedsSetUnread(unreadMap: Types.IFeedsUnreadMap) {
    return {
        type: ACT_TYPES.FEEDS_SET_UNREAD,
        unreadMap
    };
}

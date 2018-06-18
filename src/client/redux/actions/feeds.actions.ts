import {
    FEEDS_ADD_BEGIN,
    FEEDS_ADD_COMPLETE,
    FEEDS_DECREMENT_UNREAD,
    FEEDS_DELETE_BEGIN,
    FEEDS_DELETE_COMPLETE,
    FEEDS_GETALL_COMPLETE,
    FEEDS_SET_UNREAD,
    FEEDS_CLEAR_UNREAD,
    FEEDS_UPDATE_BEGIN,
    FEEDS_UPDATE_COMPLETE
} from "../actiontypes";

import { API_FEEDS_BASE } from "../apiendpoints";

import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";

import { entriesClearAll, getEntriesForFeed } from "./entries.actions";

import { resetFilter } from "./filter.actions";
import { message } from "./messages.actions";
import { propertyComparator } from "../../lib/sort";

import * as Types from "../../types";
import { OrderedMap } from "immutable";

export function beginAddFeed(feedInfo: Types.IFeed) {
    return (dispatch: Types.IDispatch) => {
        dispatch(beginAddFeedProcess());
        dispatch(addFeed(feedInfo));
    };
}

function beginAddFeedProcess() {
    return {
        type: FEEDS_ADD_BEGIN
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
                    dispatch(addFeedComplete(feedObj.feedInfo));
                    dispatch(getEntriesForFeed(feedObj.feedInfo._id));
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
        type: FEEDS_ADD_COMPLETE,
        feeds
    };
}

export function getAllFeeds() {
    return (dispatch: Types.IDispatch) => {
        const url = API_FEEDS_BASE;
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
            propertyComparator(a, b, "asc", "title")
        )
        .toOrderedMap();
}

function getAllFeedsComplete(feeds: Types.TFeeds) {
    return {
        type: FEEDS_GETALL_COMPLETE,
        feeds
    };
}

function getAllEntriesForFeeds(feeds: Types.IFeed[]) {
    return (dispatch: Types.IDispatch) => {
        dispatch(clearUnread());
        feeds.forEach(feed => {
            dispatch(getEntriesForFeed(feed._id));
        });
    };
}

function clearUnread() {
    return {
        type: FEEDS_CLEAR_UNREAD
    };
}

export function refreshAllFeeds() {
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
        type: FEEDS_DELETE_BEGIN
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
                dispatch(resetFilter());
                dispatch(deleteFeedComplete(feedId));
                dispatch(refreshAllFeeds());
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function deleteFeedComplete(feedId: Types.TFeedID) {
    return {
        type: FEEDS_DELETE_COMPLETE,
        feedId
    };
}

export function beginUpdateFeed(feedInfo: Types.IFeed) {
    return (dispatch: Types.IDispatch) => {
        dispatch(beginUpdateFeedProcess());
        dispatch(updateFeed(feedInfo));
    };
}

function beginUpdateFeedProcess() {
    return {
        type: FEEDS_UPDATE_BEGIN
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
                    dispatch(getAllFeeds());
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
        type: FEEDS_UPDATE_COMPLETE,
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

function feedsSetUnread(unreadMap: Types.IFeedsUnreadMap) {
    return {
        type: FEEDS_SET_UNREAD,
        unreadMap
    };
}

export function feedsDecrementUnread(feedId: Types.TFeedID) {
    return {
        type: FEEDS_DECREMENT_UNREAD,
        feedId
    };
}

import {
    FEEDS_ADD_BEGIN,
    FEEDS_ADD_COMPLETE,
    FEEDS_DECREMENT_UNREAD,
    FEEDS_DELETE_BEGIN,
    FEEDS_DELETE_COMPLETE,
    FEEDS_GETALL_COMPLETE,
    FEEDS_CALC_UNREAD_COUNT,
    FEEDS_CLEAR_UNREAD,
    FEEDS_UPDATE_BEGIN,
    FEEDS_UPDATE_COMPLETE
} from "../actiontypes";

import { API_FEEDS_BASE } from "../apiendpoints";

import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";

import { entriesClearAll, getEntriesForFeed } from "./entries.actions";

import { resetFilter } from "./filter.actions";
import { message } from "./messages.actions";

import * as Types from "../../types";

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

function addFeedComplete(feed: Types.IFeed) {
    return {
        type: FEEDS_ADD_COMPLETE,
        feed
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
                    dispatch(getAllFeedsComplete(resObj.feeds));
                    dispatch(getAllEntriesForFeeds(resObj.feeds));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function getAllFeedsComplete(feeds: Types.IFeed[]) {
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
    return (dispatch: Types.IDispatch, getState: () => Types.IRootStoreState) => {
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
                    dispatch(updateFeedComplete(feedObj.feedInfo));
                    dispatch(getAllFeeds());
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function updateFeedComplete(feed: Types.IFeed) {
    return {
        type: FEEDS_UPDATE_COMPLETE,
        feed
    };
}

export function feedsSetAllUnreadCount(entries: Types.IEntry[]) {
    return {
        type: FEEDS_CALC_UNREAD_COUNT,
        entries
    };
}

export function feedsDecrementUnread(feedId: Types.TFeedID) {
    return {
        type: FEEDS_DECREMENT_UNREAD,
        feedId
    };
}

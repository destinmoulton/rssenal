import {
    FEEDS_ADD_BEGIN,
    FEEDS_ADD_COMPLETE,
    FEEDS_DECREMENT_UNREAD,
    FEEDS_DELETE_BEGIN,
    FEEDS_DELETE_COMPLETE,
    FEEDS_GETALL_COMPLETE,
    FEEDS_SETALL_UNREAD_COUNT,
    FEEDS_UPDATE_BEGIN,
    FEEDS_UPDATE_COMPLETE
} from "../actiontypes";

import { API_FEEDS_BASE } from "../apiendpoints";

import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";

import { getEntriesForFeed, entriesRemoveFeed } from "./entries.actions";
import { message } from "./messages.actions";

import {
    IDispatch,
    IFeed,
    TFeedID,
    TEntries,
    IRootStoreState
} from "../../interfaces";

export function beginAddFeed(feedInfo: IFeed) {
    return (dispatch: IDispatch) => {
        dispatch(beginAddFeedProcess());
        dispatch(addFeed(feedInfo));
    };
}

function beginAddFeedProcess() {
    return {
        type: FEEDS_ADD_BEGIN
    };
}

function addFeed(feedInfo: IFeed) {
    return (dispatch: IDispatch) => {
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
                    dispatch(getEntriesForFeed(feedObj._id));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function addFeedComplete(feed: IFeed) {
    return {
        type: FEEDS_ADD_COMPLETE,
        feed
    };
}

export function getAllFeeds() {
    return (dispatch: IDispatch) => {
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

function getAllFeedsComplete(feeds: IFeed[]) {
    return {
        type: FEEDS_GETALL_COMPLETE,
        feeds
    };
}

function getAllEntriesForFeeds(feeds: IFeed[]) {
    return (dispatch: IDispatch) => {
        feeds.forEach(feed => {
            dispatch(getEntriesForFeed(feed._id));
        });
    };
}

export function beginDeleteFeed(feedId: TFeedID) {
    return (dispatch: IDispatch) => {
        dispatch(beginDeleteProcess());
        dispatch(deleteFeed(feedId));
    };
}

function beginDeleteProcess() {
    return {
        type: FEEDS_DELETE_BEGIN
    };
}

function deleteFeed(feedId: TFeedID) {
    return (dispatch: IDispatch) => {
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
                dispatch(deleteFeedComplete(feedId));
                dispatch(entriesRemoveFeed(feedId));
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function deleteFeedComplete(feedId: TFeedID) {
    return {
        type: FEEDS_DELETE_COMPLETE,
        feedId
    };
}

export function beginUpdateFeed(feedInfo: IFeed) {
    return (dispatch: IDispatch) => {
        dispatch(beginUpdateFeedProcess());
        dispatch(updateFeed(feedInfo));
    };
}

function beginUpdateFeedProcess() {
    return {
        type: FEEDS_UPDATE_BEGIN
    };
}

function updateFeed(feedInfo: IFeed) {
    return (dispatch: IDispatch, getState: () => IRootStoreState) => {
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
                    dispatch(
                        feedsSetAllUnreadCount(getState().entries.entries)
                    );
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function updateFeedComplete(feed: IFeed) {
    return {
        type: FEEDS_UPDATE_COMPLETE,
        feed
    };
}

export function feedsSetAllUnreadCount(entries: TEntries) {
    return {
        type: FEEDS_SETALL_UNREAD_COUNT,
        entries
    };
}

export function feedsDecrementUnread(feedId: TFeedID) {
    return {
        type: FEEDS_DECREMENT_UNREAD,
        feedId
    };
}

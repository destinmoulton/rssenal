import * as ACT_TYPES from "../actiontypes";

import { entriesClearAll, entriesGetAllForFeed } from "./entries.actions";
import { filterReset } from "./filter.actions";
import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";
import { message } from "./messages.actions";
import * as FeedsServices from "../services/feeds.services";

import * as Types from "../../types";
import { Feed } from "semantic-ui-react";

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
    console.log("addFeed called");
    return (dispatch: Types.IDispatch) => {
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
    return async (dispatch: Types.IDispatch) => {
        try {
            const feedsArr = await FeedsServices.getAllFeeds();
            let newFeeds = FeedsServices.convertRawFeedsToOrderedMap(feedsArr);
            newFeeds = FeedsServices.sortFeeds(newFeeds);

            dispatch(getAllFeedsComplete(newFeeds));
            dispatch(getAllEntriesForFeeds(newFeeds));
        } catch (err) {
            dispatch(message(err, "error"));
        }
    };
}

function getAllFeedsComplete(feeds: Types.TFeeds) {
    return {
        type: ACT_TYPES.FEEDS_GETALL_COMPLETE,
        feeds
    };
}

function getAllEntriesForFeeds(feeds: Types.TFeeds) {
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
        dispatch(deleteFeed(feedId));
    };
}

export function deleteFeed(feedId: Types.TFeedID) {
    return async (dispatch: Types.IDispatch) => {
        dispatch(beginDeleteProcess());

        await FeedsServices.apiDeleteFeed(feedId);
        dispatch(message("Feed removed.", "success"));
        dispatch(filterReset());
        dispatch(feedsRefreshAll());
    };
}

function beginDeleteProcess() {
    return {
        type: ACT_TYPES.FEEDS_DELETE_BEGIN
    };
}

export function saveFeed(feedInfo: Types.IFeed) {
    return async (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feeds } = getState().feedsStore;

        dispatch(beginUpdateFeedProcess());

        const updatedFeed = await FeedsServices.apiUpdateFeed(feedInfo);

        dispatch(message("Feed saved.", "success"));

        let newFeeds = FeedsServices.setSingleFeed(updatedFeed, feeds);
        newFeeds = FeedsServices.sortFeeds(newFeeds);
        dispatch(updateFeedComplete(newFeeds));

        dispatch(feedsGetAll());
    };
}

function beginUpdateFeedProcess() {
    return {
        type: ACT_TYPES.FEEDS_UPDATE_BEGIN
    };
}

function updateFeedComplete(feeds: Types.TFeeds) {
    return {
        type: ACT_TYPES.FEEDS_UPDATE_COMPLETE,
        feeds
    };
}

export function feedsUpdateUnreadCount(entries: Types.TEntries) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feeds, unreadMap } = getState().feedsStore;

        const newUnreadMap = FeedsServices.updateUnreadCount(
            unreadMap,
            entries,
            feeds
        );

        dispatch(feedsSetUnread(newUnreadMap));
    };
}

export function feedsDecrementUnread(feedId: Types.TFeedID) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feeds, unreadMap } = getState().feedsStore;

        const newUnreadMap = FeedsServices.decrementUnread(
            feedId,
            feeds,
            unreadMap
        );

        dispatch(feedsSetUnread(newUnreadMap));
    };
}

function feedsSetUnread(unreadMap: Types.IFeedsUnreadMap) {
    return {
        type: ACT_TYPES.FEEDS_SET_UNREAD,
        unreadMap
    };
}

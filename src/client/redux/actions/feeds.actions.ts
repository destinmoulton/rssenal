import * as ACT_TYPES from "../actiontypes";

import { entriesClearAll, entriesGetAllForFeed } from "./entries.actions";
import { filterReset } from "./filter.actions";
import { message } from "./messages.actions";
import * as FeedsServices from "../services/feeds.services";

import * as Types from "../../types";

export function feedAdd(feedInfo: Types.IFeed) {
    return async (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feeds } = getState().feedsStore;
        dispatch({
            type: ACT_TYPES.FEEDS_ADD_BEGIN
        });

        try {
            const newFeed = await FeedsServices.apiAddFeed(feedInfo);
            let newFeeds = FeedsServices.setSingleFeed(newFeed, feeds);
            newFeeds = FeedsServices.sortFeeds(newFeeds);
            dispatch(message("Feed added.", "success"));
            dispatch({
                type: ACT_TYPES.FEEDS_ADD_COMPLETE,
                feeds: newFeeds
            });
            dispatch(entriesGetAllForFeed(newFeed._id));
        } catch (err) {
            dispatch(message(err, "error"));
        }
    };
}

export function feedsGetAll() {
    return async (dispatch: Types.IDispatch) => {
        try {
            const feedsArr = await FeedsServices.apiGetAllFeeds();
            let newFeeds = FeedsServices.convertRawFeedsToOrderedMap(feedsArr);
            newFeeds = FeedsServices.sortFeeds(newFeeds);

            dispatch({
                type: ACT_TYPES.FEEDS_GETALL_COMPLETE,
                feeds: newFeeds
            });
            dispatch(getAllEntriesForFeeds(newFeeds));
        } catch (err) {
            dispatch(message(err, "error"));
        }
    };
}

function getAllEntriesForFeeds(feeds: Types.TFeeds) {
    return async (dispatch: Types.IDispatch) => {
        dispatch({
            type: ACT_TYPES.FEEDS_CLEAR_UNREAD
        });
        let promises: any[] = [];
        feeds.forEach(feed => {
            promises.push(dispatch(entriesGetAllForFeed(feed._id)));
        });
        return await Promise.all(promises);
    };
}

export function feedsRefreshAll() {
    return (
        dispatch: Types.IDispatch,
        getState: () => Types.IRootStoreState
    ) => {
        const { feeds } = getState().feedsStore;
        dispatch(entriesClearAll());
        dispatch(getAllEntriesForFeeds(feeds));
    };
}

export function beginDeleteFeed(feedId: Types.TFeedID) {
    return (dispatch: Types.IDispatch) => {
        dispatch(deleteFeed(feedId));
    };
}

export function deleteFeed(feedId: Types.TFeedID) {
    return async (dispatch: Types.IDispatch) => {
        dispatch({
            type: ACT_TYPES.FEEDS_DELETE_BEGIN
        });

        await FeedsServices.apiDeleteFeed(feedId);
        dispatch(message("Feed removed.", "success"));
        dispatch(filterReset());
        dispatch(feedsRefreshAll());
    };
}

export function saveFeed(feedInfo: Types.IFeed) {
    return async (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { feeds } = getState().feedsStore;

        dispatch({
            type: ACT_TYPES.FEEDS_UPDATE_BEGIN
        });

        try {
            const updatedFeed = await FeedsServices.apiUpdateFeed(feedInfo);
            dispatch(message("Feed saved.", "success"));

            let newFeeds = FeedsServices.setSingleFeed(updatedFeed, feeds);
            newFeeds = FeedsServices.sortFeeds(newFeeds);
            dispatch({
                type: ACT_TYPES.FEEDS_UPDATE_COMPLETE,
                feeds: newFeeds
            });

            dispatch(feedsGetAll());
        } catch (err) {
            dispatch(message(err, "error"));
        }
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

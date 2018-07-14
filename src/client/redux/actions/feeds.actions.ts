import * as ACT_TYPES from "../actiontypes";

import * as EntriesActions from "./entries.actions";
import { filterReset } from "./filter.actions";
import { message } from "./messages.actions";
import * as FeedsServices from "../services/feeds.services";

import * as Types from "../../types";

export function feedAdd(feedInfo: Types.IFeed) {
    return async (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        dispatch({
            type: ACT_TYPES.FEEDS_ADD_BEGIN
        });

        try {
            const newFeed = await FeedsServices.apiAddFeed(feedInfo);
            let newFeeds = FeedsServices.setSingleFeed(
                newFeed,
                getState().feedsStore.feeds
            );
            newFeeds = FeedsServices.sortFeeds(newFeeds);

            dispatch(message("Feed added.", "success"));
            dispatch({
                type: ACT_TYPES.FEEDS_ADD_COMPLETE,
                feeds: newFeeds
            });
            await dispatch(EntriesActions.entriesGetForFeed(newFeed));
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
            await dispatch(getAllEntriesForFeeds(newFeeds));
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

        try {
            const feedsArr: Types.IFeed[] = feeds.toArray();
            const prom = feedsArr.map(feed => {
                dispatch(EntriesActions.entriesGetForFeed(feed));
            });
            await Promise.all(prom);
        } catch (err) {
            console.error(err);
        }
    };
}

export function feedsRefreshAll() {
    return async (
        dispatch: Types.IDispatch,
        getState: () => Types.IRootStoreState
    ) => {
        const { feeds } = getState().feedsStore;
        dispatch(EntriesActions.entriesClearAll());
        await dispatch(getAllEntriesForFeeds(feeds));
    };
}

export function deleteFeed(feedId: Types.TFeedID) {
    return async (dispatch: Types.IDispatch) => {
        dispatch({
            type: ACT_TYPES.FEEDS_DELETE_BEGIN
        });

        try {
            await FeedsServices.apiDeleteFeed(feedId);
            dispatch(message("Feed removed.", "success"));
            dispatch(filterReset());
            await dispatch(feedsRefreshAll());
        } catch (err) {
            dispatch(message(err, "error"));
        }
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

            await dispatch(feedsGetAll());
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

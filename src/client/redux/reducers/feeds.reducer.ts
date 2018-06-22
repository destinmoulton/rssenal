import { Map, OrderedMap, Set } from "immutable";

import * as ACT_TYPES from "../actiontypes";

import {
    TFeedID,
    IFeed,
    IFeedsAction,
    IFeedsUnreadMap,
    IReducerStateFeeds
} from "../../types";

const INITIAL_UNREAD_MAP: IFeedsUnreadMap = {
    entriesCounted: Set<TFeedID>(),
    feeds: Map<TFeedID, number>(),
    folders: Map<string, number>()
};

const INITIAL_STATE: IReducerStateFeeds = {
    feeds: OrderedMap<TFeedID, IFeed>(),
    unreadMap: INITIAL_UNREAD_MAP,
    isAddingFeed: false,
    isUpdatingFeed: false
};

function feedsReducer(state = INITIAL_STATE, action: IFeedsAction) {
    switch (action.type) {
        case ACT_TYPES.FEEDS_ADD_BEGIN:
            return {
                ...state,
                isAddingFeed: true
            };
        case ACT_TYPES.FEEDS_ADD_COMPLETE: {
            return {
                ...state,
                feeds: action.feeds,
                isAddingFeed: false
            };
        }
        case ACT_TYPES.FEEDS_GETALL_COMPLETE: {
            return {
                ...state,
                feeds: action.feeds
            };
        }
        case ACT_TYPES.FEEDS_SET_UNREAD: {
            return {
                ...state,
                unreadMap: action.unreadMap
            };
        }
        case ACT_TYPES.FEEDS_CLEAR_UNREAD: {
            return {
                ...state,
                unreadMap: INITIAL_UNREAD_MAP
            };
        }
        case ACT_TYPES.FEEDS_UPDATE_BEGIN:
            return {
                ...state,
                isUpdatingFeed: true
            };
        case ACT_TYPES.FEEDS_UPDATE_COMPLETE: {
            return {
                ...state,
                feeds: action.feeds,
                isUpdatingFeed: false
            };
        }
        default:
            return {
                ...state
            };
    }
}

export default feedsReducer;

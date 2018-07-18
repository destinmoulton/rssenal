import { Map, OrderedMap, Set } from "immutable";

import * as ACT_TYPES from "../actiontypes";

import * as Types from "../../types";

import { FEEDS_INITIAL_STATE, FEEDS_INITIAL_UNREAD_MAP } from "../initialstate";

function feedsReducer(
    state = FEEDS_INITIAL_STATE,
    action: Types.IFeedsAction
): Types.IReducerStateFeeds {
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
        case ACT_TYPES.FEEDS_SET_ALL: {
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
                unreadMap: FEEDS_INITIAL_UNREAD_MAP
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

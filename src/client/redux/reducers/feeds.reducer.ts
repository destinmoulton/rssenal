import { Map, OrderedMap, Set } from "immutable";

import {
    FEEDS_ADD_BEGIN,
    FEEDS_ADD_COMPLETE,
    FEEDS_DECREMENT_UNREAD,
    FEEDS_GETALL_COMPLETE,
    FEEDS_SET_UNREAD,
    FEEDS_CLEAR_UNREAD,
    FEEDS_UPDATE_BEGIN,
    FEEDS_UPDATE_COMPLETE
} from "../actiontypes";

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
        case FEEDS_ADD_BEGIN:
            return {
                ...state,
                isAddingFeed: true
            };
        case FEEDS_ADD_COMPLETE: {
            return {
                ...state,
                feeds: action.feeds,
                isAddingFeed: false
            };
        }
        case FEEDS_DECREMENT_UNREAD: {
            const { unreadMap, feeds } = state;
            const { feedId } = action;
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
                const newCount =
                    unreadFolderCount > 1 ? unreadFolderCount - 1 : 0;
                unreadFolders = unreadFolders.set(feed.folder_id, newCount);
            }

            const newUnreadMap = { feeds: unreadFeeds, folders: unreadFolders };
            return {
                ...state,
                unreadMap: newUnreadMap
            };
        }
        case FEEDS_GETALL_COMPLETE: {
            return {
                ...state,
                feeds: action.feeds
            };
        }
        case FEEDS_SET_UNREAD: {
            return {
                ...state,
                unreadMap: action.unreadMap
            };
        }
        case FEEDS_CLEAR_UNREAD: {
            return {
                ...state,
                unreadMap: INITIAL_UNREAD_MAP
            };
        }
        case FEEDS_UPDATE_BEGIN:
            return {
                ...state,
                isUpdatingFeed: true
            };
        case FEEDS_UPDATE_COMPLETE: {
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

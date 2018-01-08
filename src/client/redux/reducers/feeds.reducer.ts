import { Map, OrderedMap, Set } from "immutable";

import {
    FEEDS_ADD_BEGIN,
    FEEDS_ADD_COMPLETE,
    FEEDS_DECREMENT_UNREAD,
    FEEDS_GETALL_COMPLETE,
    FEEDS_CALC_UNREAD_COUNT,
    FEEDS_CLEAR_UNREAD,
    FEEDS_UPDATE_BEGIN,
    FEEDS_UPDATE_COMPLETE
} from "../actiontypes";

import {
    IEntry,
    TFeedID,
    IFeed,
    IFeedsAction,
    IFeedsUnreadMap,
    IReducerStateFeeds
} from "../../interfaces";

import { compareAscByProp } from "../../lib/sort";

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
            const newFeeds = state.feeds
                .set(action.feed._id, action.feed)
                .sort((a: IFeed, b: IFeed) => compareAscByProp(a, b, "title"));
            return {
                ...state,
                feeds: newFeeds,
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
            let newFeeds = OrderedMap();
            const arrayMap = action.feeds.map((feed: IFeed) => {
                newFeeds = newFeeds.set(feed._id, feed);
            });
            return {
                ...state,
                feeds: newFeeds
            };
        }
        case FEEDS_CALC_UNREAD_COUNT: {
            const { feeds, unreadMap } = state;
            let entriesCounted = unreadMap.entriesCounted;
            let unreadFeeds = unreadMap.feeds;
            let unreadFolders = unreadMap.folders;

            action.entries.map((entry: IEntry) => {
                if (!entriesCounted.has(entry._id) || !entry.has_read) {
                    entriesCounted = entriesCounted.add(entry._id);

                    const feed = feeds.get(entry.feed_id);

                    if (!unreadFeeds.has(feed._id)) {
                        unreadFeeds = unreadFeeds.set(feed._id, 1);
                    } else {
                        const countUnread: number = unreadFeeds.get(feed._id);
                        unreadFeeds = unreadFeeds.set(
                            feed._id,
                            countUnread + 1
                        );
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
            return {
                ...state,
                unreadMap: newUnreadMap
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
            const { feeds } = state;

            const newFeeds = feeds
                .set(action.feed._id, action.feed)
                .sort((a: IFeed, b: IFeed) => compareAscByProp(a, b, "title"));

            return {
                ...state,
                feeds: newFeeds,
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

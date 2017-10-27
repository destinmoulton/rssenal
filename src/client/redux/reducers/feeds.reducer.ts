import { Map, OrderedMap } from "immutable";

import {
    FEEDS_ADD_BEGIN,
    FEEDS_ADD_COMPLETE,
    FEEDS_DECREMENT_UNREAD,
    FEEDS_GETALL_COMPLETE,
    FEEDS_SETALL_UNREAD_COUNT,
    FEEDS_UPDATE_BEGIN,
    FEEDS_UPDATE_COMPLETE
} from "../actiontypes";

import { IEntry, TFeedID, IFeed, IFeedsAction } from "../../interfaces";

import { compareAscByProp } from "../../lib/sort";

const INITIAL_STATE = {
    feeds: OrderedMap<TFeedID, IFeed>(),
    unreadMap: {"feeds": Map<TFeedID, number>(), "groups": Map<string, number>()},
    isAddingFeed: false,
    isUpdatingFeed: false
}

function feedsReducer(state = INITIAL_STATE, action: IFeedsAction){
    switch(action.type){
        case FEEDS_ADD_BEGIN:
            return {
                ...state,
                isAddingFeed: true
            }
        case FEEDS_ADD_COMPLETE: {
            const newFeeds = state.feeds.set(action.feed._id, action.feed).sort((a: IFeed, b: IFeed)=>compareAscByProp(a, b, "title"));
            return {
                ...state,
                feeds: newFeeds,
                isAddingFeed: false
            }
        }
        case FEEDS_DECREMENT_UNREAD:{
            const { unreadMap, feeds } = state;
            const { feedId } = action;
            const feed = feeds.get(feedId);

            let unreadFeeds = unreadMap.feeds;
            let unreadGroups = unreadMap.groups;

            if(unreadFeeds.has(feedId)){
                const unreadFeedCount = unreadFeeds.get(feedId);
                const newCount = (unreadFeedCount > 1) ? unreadFeedCount - 1 : 0;
                unreadFeeds = unreadFeeds.set(feedId, newCount);
            }
            
            if(unreadGroups.has(feed.feedgroup_id)){
                const unreadGroupCount = unreadGroups.get(feed.feedgroup_id);
                const newCount = (unreadGroupCount > 1) ? unreadGroupCount - 1 : 0;
                unreadGroups = unreadGroups.set(feed.feedgroup_id, newCount);
            }

            const newUnreadMap = {"feeds": unreadFeeds, "groups": unreadGroups};
            return {
                ...state,
                unreadMap: newUnreadMap
            }
        }
        case FEEDS_GETALL_COMPLETE:{
            const arrayMap = action.feeds.map((feed: IFeed)=>{
                return [feed._id, feed];
            });
            const mappedFeeds = OrderedMap(arrayMap);
            return {
                ...state,
                feeds: mappedFeeds
            }
        }
        case FEEDS_SETALL_UNREAD_COUNT:{
            const { feeds } = state;
            let unreadFeeds = Map<string, number>();
            let unreadGroups = Map<string, number>();

            action.entries.map((entry: IEntry)=>{
                if(!entry.has_read){
                    const feed = feeds.get(entry.feed_id);

                    if(!unreadFeeds.has(feed._id)){
                        unreadFeeds = unreadFeeds.set(feed._id, 1);
                    } else {
                        const countUnread: number = unreadFeeds.get(feed._id);
                        unreadFeeds = unreadFeeds.set(feed._id, countUnread + 1);
                    }

                    if(!unreadGroups.has(feed.feedgroup_id)){
                        unreadGroups = unreadGroups.set(feed.feedgroup_id, 1);
                    } else {
                        const countUnread: number = unreadGroups.get(feed.feedgroup_id);
                        unreadGroups = unreadGroups.set(feed.feedgroup_id, countUnread + 1);
                    }
                }
            });

            const newUnreadMap = {"feeds": unreadFeeds, "groups": unreadGroups};
            return {
                ...state,
                unreadMap: newUnreadMap
            }
        }
        case FEEDS_UPDATE_BEGIN:
            return {
                ...state,
                isUpdatingFeed: true
            }
        case FEEDS_UPDATE_COMPLETE:{
            const { feeds } = state;

            const newFeeds = feeds.set(action.feed._id, action.feed).sort((a: IFeed, b: IFeed)=>compareAscByProp(a, b, "title"));
            return {
                ...state,
                feeds: newFeeds,
                isUpdatingFeed: false
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default feedsReducer;
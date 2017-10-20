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


const INITIAL_STATE = {
    feeds: OrderedMap(),
    unreadMap: {"feeds": Map(), "groups": Map()},
    isAddingFeed: false,
    isUpdatingFeed: false
}

function sortFeeds(a, b){
    if(a.title < b.title){ return -1; }
    if(a.title > b.title){ return 1; }
    if(a.title === b.title){ return 0;}
}

function feedsReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case FEEDS_ADD_BEGIN:
            return {
                ...state,
                isAddingFeed: true
            }
        case FEEDS_ADD_COMPLETE: {
            const newFeeds = state.feeds.push(action.feed).sort(sortFeeds);
            return {
                ...state,
                feeds: newFeeds,
                isAddingFeed: false
            }
        }
        case FEEDS_DECREMENT_UNREAD:{
            const { unreadMap, feeds } = state;
            const { entry } = action;
            const { feed } = feeds.get(entry.feed_id);

            const unreadFeeds = unreadMap.feeds;
            const unreadGroups = unreadMap.groups;

            if(unreadFeeds.has(entry.feed_id)){
                const unreadCount = unreadFeeds.get(entry.feed_id);
                unreadFeeds = unreadFeeds.set(entry.feed_id, unreadCount - 1);
            }
            
            if(unreadGroups.has(feed.group_id)){
                const unreadCount = unreadGroups.get(feed.group_id);
                unreadGroups = unreadGroups.set(feed.group_id, unreadCount - 1);
            }

            const unreadMap = {"feeds": unreadFeeds, "groups": unreadGroups};
            return {
                ...state,
                unreadMap
            }
        }
        case FEEDS_GETALL_COMPLETE:{
            const arrayMap = action.feeds.map((feed)=>{
                return [feed._id, feed];
            });
            const mappedFeeds = OrderedMap(arrayMap);
            return {
                ...state,
                feeds: mappedFeeds
            }
        }
        case FEEDS_SETALL_UNREAD_COUNT:{
            const { feeds, unreadMap } = state;
            const unreadFeeds = unreadMap.feeds;
            const unreadGroups = unreadMap.groups;

            action.entries.map((entry)=>{
                if(!entry.has_read){
                    const feed = feeds.get(entry.feed_id);
                    if(!unreadFeeds.has(feed._id)){
                        unreadFeeds.set(feed._id, 1);
                    } else {
                        const countUnread = unreadFeeds.get(feed._id);
                        unreadFeeds.set(feed._id, countUnread + 1);
                    }

                    if(!unreadGroups.has(feed.group_id)){
                        unreadGroups.set(feed.group_id, 1);
                    } else {
                        const countUnread = unreadGroups.get(feed.group_id);
                        unreadGroups.set(feed.group_id, countUnread + 1);
                    }
                }
            });

            const unreadMap = {"feeds": unreadFeeds, "groups": unreadGroups};
            return {
                ...state,
                unreadMap
            }
        }
        case FEEDS_UPDATE_BEGIN:
            return {
                ...state,
                isUpdatingFeed: true
            }
        case FEEDS_UPDATE_COMPLETE:{
            const { feeds } = state;

            const newFeeds = feeds.set(action.feed._id, action.feed).sort(sortFeeds);
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
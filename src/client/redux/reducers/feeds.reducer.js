import { List } from "immutable";

import {
    FEEDS_ADD_BEGIN,
    FEEDS_ADD_COMPLETE,
    FEEDS_GETALL_COMPLETE
} from "../actiontypes";


const INITIAL_STATE = {
    feeds: List(),
    isAddingFeed: false
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
        case FEEDS_GETALL_COMPLETE:{
            const feeds = List(action.feeds);
            return {
                ...state,
                feeds
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default feedsReducer;
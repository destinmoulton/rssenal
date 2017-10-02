import { OrderedMap } from "immutable";

import { 
    FEEDGROUPS_FETCHING,
    FEEDGROUPS_RECEIVED
} from "../actiontypes";

const INITIAL_STATE = {
    groups: OrderedMap(),
    isFetchingFeedGroups: false,
    hasFeedGroups: false
};

const FeedGroupsReducer = function(state = INITIAL_STATE, action){
    switch(action.type){
        case FEEDGROUPS_FETCHING:
            return {
                ...state,
                isFetchingFeedGroups: true
            }
        case FEEDGROUPS_RECEIVED:
            let keyedGroups = [];
            action.groups.map((group)=>{
                keyedGroups.push({[group._id]: group});
            });

            const freshGroups = OrderedMap(keyedGroups);

            return {
                ...state,
                groups: freshGroups,
                hasFeedGroups: true
            }
        default:
            return state;
    }
}

export default FeedGroupsReducer;
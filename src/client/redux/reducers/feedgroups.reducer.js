import { List } from "immutable";

import { 
    FEEDGROUPS_FETCHING,
    FEEDGROUPS_RECEIVED
} from "../actiontypes";

const INITIAL_STATE = {
    groups: List(),
    isFetchingFeedGroups: false,
    hasFeedGroups: false
};

const feedGroupsReducer = function(state = INITIAL_STATE, action){
    switch(action.type){
        case FEEDGROUPS_FETCHING:
            return {
                ...state,
                isFetchingFeedGroups: true
            }
        case FEEDGROUPS_RECEIVED:
            const freshGroups = List(action.groups);

            return {
                ...state,
                groups: freshGroups,
                hasFeedGroups: true
            }
        default:
            return state;
    }
}

export default feedGroupsReducer;
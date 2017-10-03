import { List } from "immutable";

import { 
    FEEDGROUPS_FETCHING,
    FEEDGROUPS_RECEIVED,
    FEEDGROUPS_UPDATE_BEGIN,
    FEEDGROUPS_UPDATE_COMPLETE
} from "../actiontypes";

const INITIAL_STATE = {
    groups: List(),
    isFetchingFeedGroups: false,
    hasFeedGroups: false,
    updatingFeedGroups: List()
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
        case FEEDGROUPS_UPDATE_BEGIN: {
            const updatingFeedGroups = state.updatingFeedGroups.push(action.groupId);

            return {
                ...state,
                updatingFeedGroups
            }
        }

        case FEEDGROUPS_UPDATE_COMPLETE: {
            const groupIndex = state.groups.findIndex((group)=>{
                return group._id === action.group._id;
            });

            const groups = state.groups.update(groupIndex, val => action.group);

            const updatingIndex = state.updatingFeedGroups.findIndex((groupId)=>{
                return groupId === action.group._id;
            });
            const updatingFeedGroups = state.updatingFeedGroups.delete(updatingIndex);
            
            return {
                ...state,
                groups,
                updatingFeedGroups
            }
        }
        default:
            return state;
    }
}

export default feedGroupsReducer;
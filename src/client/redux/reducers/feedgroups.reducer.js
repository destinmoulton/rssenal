import { List } from "immutable";

import { 
    FEEDGROUPS_FETCHING,
    FEEDGROUPS_RECEIVED,
    FEEDGROUPS_ADD_BEGIN,
    FEEDGROUPS_ADD_COMPLETE,
    FEEDGROUPS_DELETE_BEGIN,
    FEEDGROUPS_DELETE_COMPLETE,
    FEEDGROUPS_UPDATE_BEGIN,
    FEEDGROUPS_UPDATE_COMPLETE
} from "../actiontypes";

const INITIAL_STATE = {
    groups: List(),
    isFetchingFeedGroups: false,
    hasFeedGroups: false,
    updatingFeedGroups: List(),
    isAddingFeedGroup: false,
    isDeletingFeedGroup: false
};

const UNCATEGORIZED_FEEDGROUP = [{
    _id: "0",
    name: "Uncategorized"
}];

const feedGroupsReducer = function(state = INITIAL_STATE, action){
    switch(action.type){
        case FEEDGROUPS_FETCHING:
            return {
                ...state,
                isFetchingFeedGroups: true
            }
        case FEEDGROUPS_RECEIVED:
            const freshGroups = List(action.groups);
            const fullGroups = freshGroups.concat(UNCATEGORIZED_FEEDGROUP);

            return {
                ...state,
                groups: fullGroups,
                hasFeedGroups: true
            }
        case FEEDGROUPS_ADD_BEGIN:
            return {
                ...state,
                isAddingFeedGroup: true
            }
        case FEEDGROUPS_ADD_COMPLETE: {
            const groups = state.groups.push(action.group);
            return {
                ...state,
                groups,
                isAddingFeedGroup: false
            }
        }
        case FEEDGROUPS_DELETE_BEGIN: 
            return {
                ...state,
                isDeletingFeedGroup: true
            }
        case FEEDGROUPS_DELETE_COMPLETE: 
            const groupIndex = state.groups.findIndex((group)=>{
                return group._id === action.groupId;
            });

            const groups = state.groups.delete(groupIndex);
            return {
                ...state,
                groups,
                isDeletingFeedGroup: false
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
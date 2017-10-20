import { Map, OrderedMap } from "immutable";

import { 
    FEEDGROUPS_FETCHING,
    FEEDGROUPS_RECEIVED,
    FEEDGROUPS_ADD_BEGIN,
    FEEDGROUPS_ADD_COMPLETE,
    FEEDGROUPS_DECREMENT_UNREAD,
    FEEDGROUPS_DELETE_BEGIN,
    FEEDGROUPS_DELETE_COMPLETE,
    FEEDGROUPS_UPDATE_BEGIN,
    FEEDGROUPS_UPDATE_COMPLETE
} from "../actiontypes";

const INITIAL_STATE = {
    groups: OrderedMap(),
    hasFeedGroups: false,
    isDeletingFeedGroup: false,
    isFetchingFeedGroups: false,
    isSavingFeedGroup: false
};

const UNCATEGORIZED_FEEDGROUP = {
    _id: "0",
    name: "Uncategorized",
    order: Infinity
};

const feedGroupsReducer = function(state = INITIAL_STATE, action){
    switch(action.type){
        case FEEDGROUPS_FETCHING:
            return {
                ...state,
                isFetchingFeedGroups: true
            }
        case FEEDGROUPS_RECEIVED:
            const arrayMap = action.groups.map((group)=>{
                return [group._id, group];
            });
            const mappedGroups = OrderedMap(arrayMap);
            const fullGroups = mappedGroups.set(UNCATEGORIZED_FEEDGROUP._id, UNCATEGORIZED_FEEDGROUP);
            
            return {
                ...state,
                groups: fullGroups,
                hasFeedGroups: true
            }
        case FEEDGROUPS_ADD_BEGIN:
            return {
                ...state,
                isSavingFeedGroup: true
            }
        case FEEDGROUPS_ADD_COMPLETE: {
            const groups = state.groups.set(action.group._id, action.group);
            return {
                ...state,
                groups,
                isSavingFeedGroup: false
            }
        }
        case FEEDGROUPS_DECREMENT_UNREAD:{
            const feedgroup = state.groups.get(action.groupId);
            feedgroup.unread_count -= 1;

            const newFeedgroups = state.groups.set(action.groupId, feedgroup);

            return {
                ...state,
                groups: newFeedgroups
            }
        }
        case FEEDGROUPS_DELETE_BEGIN: 
            return {
                ...state,
                isDeletingFeedGroup: true
            }
        case FEEDGROUPS_DELETE_COMPLETE: {
            const groups = state.groups.delete(action.groupId);
            const groupsUnreadMap = state.groupsUnreadMap.delete(action.groupId);
            return {
                ...state,
                groups,
                groupsUnreadMap,
                isDeletingFeedGroup: false
            }
        }
        case FEEDGROUPS_UPDATE_BEGIN: {
            return {
                ...state,
                isSavingFeedGroup: true
            }
        }
        case FEEDGROUPS_UPDATE_COMPLETE: {
            const groups = state.groups.set(action.group._id, action.group);
            
            return {
                ...state,
                groups,
                isSavingFeedGroup: false
            }
        }
        default:
            return state;
    }
}

export default feedGroupsReducer;
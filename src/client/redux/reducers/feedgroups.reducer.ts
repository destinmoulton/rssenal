import { Map, OrderedMap } from "immutable";

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

import { TFeedgroupID, IFeedgroup, IFeedgroupAction } from "../../interfaces";

const INITIAL_STATE = {
    groups: OrderedMap<TFeedgroupID, IFeedgroup>(),
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

const feedGroupsReducer = function(state = INITIAL_STATE, action: IFeedgroupAction){
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
        case FEEDGROUPS_DELETE_BEGIN: 
            return {
                ...state,
                isDeletingFeedGroup: true
            }
        case FEEDGROUPS_DELETE_COMPLETE: {
            const groups = state.groups.delete(action.groupId);

            return {
                ...state,
                groups,
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
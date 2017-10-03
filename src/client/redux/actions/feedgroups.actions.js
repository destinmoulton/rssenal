import {
    FEEDGROUPS_FETCHING,
    FEEDGROUPS_RECEIVED,
    FEEDGROUPS_UPDATE_BEGIN,
    FEEDGROUPS_UPDATE_COMPLETE
} from "../actiontypes";

import {
    API_FEEDGROUPS_BASE,
    API_FEEDGROUPS_GET_ALL
} from "../apiendpoints";

export function getAllFeedGroups(){
    return (dispatch)=>{
        dispatch(fetchingInProgress());
        dispatch(fetchFeedGroups());
    }
}

function fetchingInProgress(){
    return {
        type: FEEDGROUPS_FETCHING
    }
}

function fetchFeedGroups(){
    return (dispatch)=>{
        const init = {
            url: API_FEEDGROUPS_GET_ALL,
            method: "GET"
        };
        fetch(init)
            .then((res)=>{
                return res.json();
            })
            .then((groups)=>{
                dispatch(fetchingComplete(groups));
            })
    }
}

function fetchingComplete(data){
    return {
        type: FEEDGROUPS_RECEIVED,
        groups: data
    }
}

export function beginSaveFeedGroup(groupId, newGroupName){
    return (dispatch)=>{
        dispatch(updatingInProgress(groupId));
        dispatch(updateFeedGroup(groupId, newGroupName));
    };
}

function updatingInProgress(groupId){
    return {
        type: FEEDGROUPS_UPDATE_BEGIN,
        groupId
    };
}

function updateFeedGroup(groupId, newGroupName){
    return (dispatch)=>{
        const init = {
            url: API_FEEDGROUPS_BASE + groupId,
            method: "UPDATE",
            body: JSON.stringify({name: newGroupName})
        };
        const url = 
        fetch(init)
        .then((res)=>{
            return res.json();
        })
        .then((newGroup)=>{
            dispatch(updatingComplete(newGroup))
        })
    }
}

function updatingComplete(newGroup){
    return {
        type: FEEDGROUPS_UPDATE_COMPLETE,
        group: newGroup
    }
}
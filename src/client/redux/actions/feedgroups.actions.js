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
        const url = API_FEEDGROUPS_GET_ALL;
        const init = {
            method: "GET"
        };
        fetch(url, init)
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

export function beginAddFeedGroup(newGroupName){
    return (dispatch)=>{
        dispatch(addingInProgress());
        dispatch(addFeedGroup(newGroupName));
    }
}

function addingInProgress(){
    return {
        type: FEEDGROUPS_ADD_BEGIN
    }
}

function addFeedGroup(newGroupName){
    return (dispatch)=>{
        const url = API_FEEDGROUPS_BASE;
        const init = {
            method: "POST",
            body: JSON.stringify({name: newGroupName}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((newGroup)=>{
                dispatch(addingFeedGroupComplete(newGroup));
            })
    }
}

function addingFeedGroupComplete(group){
    return {
        type: FEEDGROUPS_ADD_COMPLETE,
        group
    };
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
        const url = API_FEEDGROUPS_BASE + groupId;
        const init = {
            method: "PUT",
            body: JSON.stringify({name: newGroupName}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        fetch(url, init)
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

export function beginDeleteFeedGroup(groupId){
    return (dispatch)=>{
        dispatch(deleteInProgress());
        dispatch(deleteFeedGroup(groupId));
    }
}

function deleteInProgress(){
    return {
        type: FEEDGROUPS_DELETE_BEGIN
    }
}

function deleteFeedGroup(groupId){
    return (dispatch)=>{
        const url = API_FEEDGROUPS_BASE + groupId;
        const init = {
            method: "DELETE"
        }
        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resObj)=>{
                if(resObj.status==="success"){
                    dispatch(deleteComplete(groupId));
                }
            })
    }
}

function deleteComplete(groupId){
    return {
        type: FEEDGROUPS_DELETE_COMPLETE,
        groupId
    }
}


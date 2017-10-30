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

import { IDispatch, IFeedgroup, TFeedgroupID } from "../../interfaces";

export function getAllFeedGroups(){
    return (dispatch: IDispatch)=>{
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
    return (dispatch: IDispatch)=>{
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

function fetchingComplete(data: IFeedgroup[]){
    return {
        type: FEEDGROUPS_RECEIVED,
        groups: data
    }
}

export function beginSaveFeedGroup(groupInfo: IFeedgroup){
    return (dispatch: IDispatch)=>{
        if(groupInfo._id !== ""){
            dispatch(updatingInProgress());
            dispatch(updateFeedGroup(groupInfo._id, groupInfo.name));
        } else {
            dispatch(addingInProgress());
            dispatch(addFeedGroup(groupInfo.name));
        }
    }
}

function addingInProgress(){
    return {
        type: FEEDGROUPS_ADD_BEGIN
    }
}

function addFeedGroup(newGroupName: string){
    return (dispatch: IDispatch)=>{
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

function addingFeedGroupComplete(group: IFeedgroup){
    return {
        type: FEEDGROUPS_ADD_COMPLETE,
        group
    };
}

function updatingInProgress(){
    return {
        type: FEEDGROUPS_UPDATE_BEGIN
    };
}

function updateFeedGroup(groupId: TFeedgroupID, newGroupName: string){
    return (dispatch: IDispatch)=>{
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

function updatingComplete(newGroup: IFeedgroup){
    return {
        type: FEEDGROUPS_UPDATE_COMPLETE,
        group: newGroup
    }
}

export function beginDeleteFeedGroup(groupId: TFeedgroupID){
    return (dispatch: IDispatch)=>{
        dispatch(deleteInProgress());
        dispatch(deleteFeedGroup(groupId));
    }
}

function deleteInProgress(){
    return {
        type: FEEDGROUPS_DELETE_BEGIN
    }
}

function deleteFeedGroup(groupId: TFeedgroupID){
    return (dispatch: IDispatch)=>{
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

function deleteComplete(groupId: TFeedgroupID){
    return {
        type: FEEDGROUPS_DELETE_COMPLETE,
        groupId
    }
}
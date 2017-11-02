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

import { IDispatch, IFolder, TFolderID } from "../../interfaces";

export function getAllFolders(){
    return (dispatch: IDispatch)=>{
        dispatch(fetchingInProgress());
        dispatch(fetchFolders());
    }
}

function fetchingInProgress(){
    return {
        type: FEEDGROUPS_FETCHING
    }
}

function fetchFolders(){
    return (dispatch: IDispatch)=>{
        const url = API_FEEDGROUPS_GET_ALL;
        const init = {
            method: "GET"
        };
        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((folders)=>{
                dispatch(fetchingComplete(folders));
            })
    }
}

function fetchingComplete(data: IFolder[]){
    return {
        type: FEEDGROUPS_RECEIVED,
        folders: data
    }
}

export function beginSaveFolder(groupInfo: IFolder){
    return (dispatch: IDispatch)=>{
        if(groupInfo._id !== ""){
            dispatch(updatingInProgress());
            dispatch(updateFolder(groupInfo._id, groupInfo.name));
        } else {
            dispatch(addingInProgress());
            dispatch(addFolder(groupInfo.name));
        }
    }
}

function addingInProgress(){
    return {
        type: FEEDGROUPS_ADD_BEGIN
    }
}

function addFolder(newGroupName: string){
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
                dispatch(addingFolderComplete(newGroup));
            })
    }
}

function addingFolderComplete(folder: IFolder){
    return {
        type: FEEDGROUPS_ADD_COMPLETE,
        folder
    };
}

function updatingInProgress(){
    return {
        type: FEEDGROUPS_UPDATE_BEGIN
    };
}

function updateFolder(groupId: TFolderID, newGroupName: string){
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

function updatingComplete(newGroup: IFolder){
    return {
        type: FEEDGROUPS_UPDATE_COMPLETE,
        folder: newGroup
    }
}

export function beginDeleteFolder(groupId: TFolderID){
    return (dispatch: IDispatch)=>{
        dispatch(deleteInProgress());
        dispatch(deleteFolder(groupId));
    }
}

function deleteInProgress(){
    return {
        type: FEEDGROUPS_DELETE_BEGIN
    }
}

function deleteFolder(groupId: TFolderID){
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

function deleteComplete(groupId: TFolderID){
    return {
        type: FEEDGROUPS_DELETE_COMPLETE,
        groupId
    }
}

export function beginReorderFolders(foldersArr: IFolder[]){
    return (dispatch: IDispatch)=>{
        const url = API_FEEDGROUPS_BASE;
        const init = {
            method: "PUT",
            body: JSON.stringify({folders: foldersArr}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resObj)=>{
                if(resObj.status==="success"){
                    dispatch(getAllFolders());
                }
            })
    }
}
import {
   FOLDERS_FETCHING,
   FOLDERS_RECEIVED,
   FOLDERS_ADD_BEGIN,
   FOLDERS_ADD_COMPLETE,
   FOLDERS_DELETE_BEGIN,
   FOLDERS_DELETE_COMPLETE,
   FOLDERS_UPDATE_BEGIN,
   FOLDERS_UPDATE_COMPLETE
} from "../actiontypes";

import {
    API_FOLDERS_BASE,
    API_FOLDERS_GET_ALL
} from "../apiendpoints";

import {
    JSON_HEADERS
} from "../../lib/headers";

import { IDispatch, IFolder, TFolderID } from "../../interfaces";
import { message } from "./messages.actions";

export function getAllFolders(){
    return (dispatch: IDispatch)=>{
        dispatch(fetchingInProgress());
        dispatch(fetchFolders());
    }
}

function fetchingInProgress(){
    return {
        type:FOLDERS_FETCHING
    }
}

function fetchFolders(){
    return (dispatch: IDispatch)=>{
        const url = API_FOLDERS_GET_ALL;
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
            .catch((err)=>{
                console.error(err);
            })
    }
}

function fetchingComplete(data: IFolder[]){
    return {
        type:FOLDERS_RECEIVED,
        folders: data
    }
}

export function beginSaveFolder(folderInfo: IFolder){
    return (dispatch: IDispatch)=>{
        if(folderInfo._id !== ""){
            dispatch(updatingInProgress());
            dispatch(updateFolder(folderInfo._id, folderInfo.name));
        } else {
            dispatch(addingInProgress());
            dispatch(addFolder(folderInfo.name));
        }
    }
}

function addingInProgress(){
    return {
        type:FOLDERS_ADD_BEGIN
    }
}

function addFolder(newFolderName: string){
    return (dispatch: IDispatch)=>{
        const url = API_FOLDERS_BASE;
        const init = {
            method: "POST",
            body: JSON.stringify({name: newFolderName}),
            headers: JSON_HEADERS
        }
        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resObj)=>{
                if(resObj.status === "error"){
                    return console.error(resObj);
                } else {
                    dispatch(message("Folder added.", "success"));
                    return dispatch(addingFolderComplete(resObj));
                }
            })
            .catch((err)=>{
                console.error(err);
            })
    }
}

function addingFolderComplete(folder: IFolder){
    return {
        type:FOLDERS_ADD_COMPLETE,
        folder
    };
}

function updatingInProgress(){
    return {
        type:FOLDERS_UPDATE_BEGIN
    };
}

function updateFolder(folderId: TFolderID, newFolderName: string){
    return (dispatch: IDispatch)=>{
        const url = API_FOLDERS_BASE + folderId;
        const init = {
            method: "PUT",
            body: JSON.stringify({name: newFolderName}),
            headers: JSON_HEADERS
        };

        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resObj)=>{
                if(resObj.status === "error"){
                    return console.error(resObj);
                } else {
                    dispatch(message("Folder saved.", "success"));
                    return dispatch(updatingComplete(resObj));
                }
            })
            .catch((err)=>{
                console.error(err);
            })
    }
}

function updatingComplete(newFolder: IFolder){
    return {
        type:FOLDERS_UPDATE_COMPLETE,
        folder: newFolder
    }
}

export function beginDeleteFolder(folderId: TFolderID){
    return (dispatch: IDispatch)=>{
        dispatch(deleteInProgress());
        dispatch(deleteFolder(folderId));
    }
}

function deleteInProgress(){
    return {
        type:FOLDERS_DELETE_BEGIN
    }
}

function deleteFolder(folderId: TFolderID){
    return (dispatch: IDispatch)=>{
        const url = API_FOLDERS_BASE + folderId;
        const init = {
            method: "DELETE"
        }
        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resObj)=>{
                if(resObj.status==="success"){
                    dispatch(message("Folder removed.", "success"));
                    return dispatch(deleteComplete(folderId));
                } else {
                    console.error(resObj);
                }
            })
            .catch((err)=>{
                console.error(err);
            })
    }
}

function deleteComplete(folderId: TFolderID){
    return {
        type:FOLDERS_DELETE_COMPLETE,
        folderId
    }
}

export function beginReorderFolders(foldersArr: IFolder[]){
    return (dispatch: IDispatch)=>{
        const url = API_FOLDERS_BASE;
        const init = {
            method: "PUT",
            body: JSON.stringify({folders: foldersArr}),
            headers: JSON_HEADERS
        }
        fetch(url, init)
            .then((res)=>{
                return res.json();
            })
            .then((resObj)=>{
                if(resObj.status==="success"){
                    dispatch(message("Folders reordered.", "success"));
                    return dispatch(getAllFolders());
                }
            })
            .catch((err)=>{
                console.error(err);
            })
    }
}
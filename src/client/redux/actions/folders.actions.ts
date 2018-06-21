import { OrderedMap } from "immutable";

import * as ACT_TYPES from "../actiontypes";
import { API_FOLDERS_BASE, API_FOLDERS_GET_ALL } from "../apiendpoints";
import { UNCATEGORIZED_FOLDER } from "../../constants";
import { getAllFeeds } from "./feeds.actions";
import { resetFilter } from "./filter.actions";
import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";
import { message } from "./messages.actions";

import {
    IDispatch,
    IGetState,
    IFolder,
    TFolderID,
    TFolders
} from "../../types";
export function getAllFolders() {
    return (dispatch: IDispatch) => {
        dispatch(fetchingInProgress());
        dispatch(fetchFolders());
    };
}

function fetchingInProgress() {
    return {
        type: ACT_TYPES.FOLDERS_FETCHING
    };
}

function fetchFolders() {
    return (dispatch: IDispatch) => {
        const url = API_FOLDERS_GET_ALL;
        const init = {
            method: "GET",
            headers: generateJWTHeaders()
        };
        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(folders => {
                dispatch(createOrderedMapAfterFetchingFolders(folders));
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function createOrderedMapAfterFetchingFolders(foldersArr: IFolder[]) {
    return (dispatch: IDispatch) => {
        const arrayMap = foldersArr.map(folder => {
            return [folder._id, folder];
        });
        const mappedFolders: TFolders = OrderedMap(arrayMap);
        const fullFolders: TFolders = mappedFolders.set(
            UNCATEGORIZED_FOLDER._id,
            UNCATEGORIZED_FOLDER
        );
        dispatch(fetchingComplete(fullFolders));
    };
}

function fetchingComplete(folders: TFolders) {
    return {
        type: ACT_TYPES.FOLDERS_RECEIVED,
        folders
    };
}

export function beginSaveFolder(folderInfo: IFolder) {
    return (dispatch: IDispatch) => {
        if (folderInfo._id !== "") {
            dispatch(updatingInProgress());
            dispatch(updateFolder(folderInfo._id, folderInfo.name));
        } else {
            dispatch(addingInProgress());
            dispatch(addFolder(folderInfo.name));
        }
    };
}

function addingInProgress() {
    return {
        type: ACT_TYPES.FOLDERS_ADD_BEGIN
    };
}

function addFolder(newFolderName: string) {
    return (dispatch: IDispatch) => {
        const url = API_FOLDERS_BASE;
        const init = {
            method: "POST",
            body: JSON.stringify({ name: newFolderName }),
            headers: generateJWTJSONHeaders()
        };
        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(resObj => {
                if (resObj.status === "error") {
                    return console.error(resObj);
                } else {
                    dispatch(message("Folder added.", "success"));
                    return dispatch(updateStoreAfterAddFolder(resObj));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function updateStoreAfterAddFolder(newFolder: IFolder) {
    return (dispatch: IDispatch, getState: IGetState) => {
        const { folders } = getState().foldersStore;
        const updatedFolders = folders.set(newFolder._id, newFolder);
        dispatch(addFolderComplete(updatedFolders));
    };
}

function addFolderComplete(folders: TFolders) {
    return {
        type: ACT_TYPES.FOLDERS_ADD_COMPLETE,
        folders
    };
}

function updatingInProgress() {
    return {
        type: ACT_TYPES.FOLDERS_UPDATE_BEGIN
    };
}

function updateFolder(folderId: TFolderID, newFolderName: string) {
    return (dispatch: IDispatch) => {
        const url = API_FOLDERS_BASE + folderId;
        const init = {
            method: "PUT",
            body: JSON.stringify({ name: newFolderName }),
            headers: generateJWTJSONHeaders()
        };

        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(resObj => {
                if (resObj.status === "error") {
                    return console.error(resObj);
                } else {
                    dispatch(message("Folder saved.", "success"));
                    return dispatch(updateStoreAfterUpdate(resObj));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function updateStoreAfterUpdate(updatedFolder: IFolder) {
    return (dispatch: IDispatch, getState: IGetState) => {
        const { folders } = getState().foldersStore;
        const updatedFolders = folders.set(updatedFolder._id, updatedFolder);
        dispatch(updatingComplete(updatedFolders));
    };
}

function updatingComplete(folders: TFolders) {
    return {
        type: ACT_TYPES.FOLDERS_UPDATE_COMPLETE,
        folders
    };
}

export function beginDeleteFolder(folderId: TFolderID) {
    return (dispatch: IDispatch) => {
        dispatch(deleteInProgress());
        dispatch(deleteFolder(folderId));
    };
}

function deleteInProgress() {
    return {
        type: ACT_TYPES.FOLDERS_DELETE_BEGIN
    };
}

function deleteFolder(folderId: TFolderID) {
    return (dispatch: IDispatch) => {
        const url = API_FOLDERS_BASE + folderId;
        const init = {
            method: "DELETE",
            headers: generateJWTHeaders()
        };
        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(resObj => {
                if (resObj.status === "success") {
                    dispatch(message("Folder removed.", "success"));
                    dispatch(resetFilter());
                    dispatch(updateFoldersAfterDelete(folderId));
                    dispatch(getAllFeeds());
                } else {
                    console.error(resObj);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

function updateFoldersAfterDelete(folderId: TFolderID) {
    return (dispatch: IDispatch, getState: IGetState) => {
        const { folders } = getState().foldersStore;
        const updatedFolders = folders.delete(folderId);
        dispatch(deleteComplete(updatedFolders));
    };
}

function deleteComplete(folders: TFolders) {
    return {
        type: ACT_TYPES.FOLDERS_DELETE_COMPLETE,
        folders
    };
}

export function beginReorderFolders(foldersArr: IFolder[]) {
    return (dispatch: IDispatch) => {
        const url = API_FOLDERS_BASE;
        const init = {
            method: "PUT",
            body: JSON.stringify({ folders: foldersArr }),
            headers: generateJWTJSONHeaders()
        };
        fetch(url, init)
            .then(res => {
                return res.json();
            })
            .then(resObj => {
                if (resObj.status === "success") {
                    dispatch(message("Folders reordered.", "success"));
                    return dispatch(getAllFolders());
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

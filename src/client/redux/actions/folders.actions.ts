import * as ACT_TYPES from "../actiontypes";

import { feedsGetAll } from "./feeds.actions";
import { filterReset } from "./filter.actions";
import * as FoldersServices from "../services/folders.services";
import { message } from "./messages.actions";
import * as Types from "../../types";

export function foldersGetAll() {
    return async (dispatch: Types.IDispatch) => {
        dispatch(fetchingInProgress());

        try {
            const foldersArr = await FoldersServices.apiGetAllFolders();
            const newFolders = FoldersServices.convertRawFoldersToOrderedMap(
                foldersArr
            );
            dispatch(fetchingComplete(newFolders));
        } catch (err) {
            console.error(err);
        }
    };
}

function fetchingInProgress() {
    return {
        type: ACT_TYPES.FOLDERS_FETCHING
    };
}

function fetchingComplete(folders: Types.TFolders) {
    return {
        type: ACT_TYPES.FOLDERS_RECEIVED,
        folders
    };
}

export function folderInitiateSave(folderInfo: Types.IFolder) {
    return async (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { folders } = getState().foldersStore;
        if (folderInfo._id !== "") {
            dispatch(updatingInProgress());
            const updatedFolder = await FoldersServices.apiSaveFolder(
                folderInfo
            );

            dispatch(message("Folder saved.", "success"));

            const updatedFolders = FoldersServices.setFolder(
                updatedFolder,
                folders
            );
            dispatch(updatingComplete(updatedFolders));
        } else {
            dispatch(addingInProgress());
            try {
                const newFolder = await FoldersServices.apiAddFolder(
                    folderInfo.name
                );
                dispatch(message("Folder added.", "success"));

                const updatedFolders = FoldersServices.setFolder(
                    newFolder,
                    folders
                );
                dispatch(addFolderComplete(updatedFolders));
            } catch (err) {
                console.error(err);
            }
        }
    };
}

function addingInProgress() {
    return {
        type: ACT_TYPES.FOLDERS_ADD_BEGIN
    };
}

function addFolderComplete(folders: Types.TFolders) {
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

function updatingComplete(folders: Types.TFolders) {
    return {
        type: ACT_TYPES.FOLDERS_UPDATE_COMPLETE,
        folders
    };
}

export function folderInitiateDelete(folderId: Types.TFolderID) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { folders } = getState().foldersStore;
        dispatch(deleteInProgress());

        try {
            await FoldersServices.apiDeleteFolder(folderId);
            const updatedFolders = FoldersServices.removeFolderFromOrderedMap(
                folderId,
                folders
            );

            dispatch(deleteComplete(updatedFolders));
        } catch (err) {
            console.error(err);
        }
    };
}

function deleteInProgress() {
    return {
        type: ACT_TYPES.FOLDERS_DELETE_BEGIN
    };
}

function deleteComplete(folders: Types.TFolders) {
    return {
        type: ACT_TYPES.FOLDERS_DELETE_COMPLETE,
        folders
    };
}

export function folderInitiateReorder(foldersArr: Types.IFolder[]) {
    return (dispatch: Types.IDispatch) => {
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
                    return dispatch(foldersGetAll());
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

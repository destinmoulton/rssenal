import * as ACT_TYPES from "../actiontypes";

import { feedsGetAll } from "./feeds.actions";
import { filterReset } from "./filter.actions";
import * as FoldersServices from "../services/folders.services";
import { message } from "./messages.actions";
import * as Types from "../../types";

export function foldersGetAll() {
    return async (dispatch: Types.IDispatch) => {
        dispatch({
            type: ACT_TYPES.FOLDERS_FETCHING
        });

        try {
            const foldersArr = await FoldersServices.apiGetAllFolders();
            const newFolders = FoldersServices.convertRawFoldersToOrderedMap(
                foldersArr
            );
            dispatch({
                type: ACT_TYPES.FOLDERS_RECEIVED,
                folders: newFolders
            });
        } catch (err) {
            console.error(err);
        }
    };
}

export function folderSave(folderInfo: Types.IFolder) {
    return async (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { folders } = getState().foldersStore;
        if (folderInfo._id !== "") {
            dispatch({
                type: ACT_TYPES.FOLDERS_UPDATE_BEGIN
            });
            const updatedFolder = await FoldersServices.apiSaveFolder(
                folderInfo
            );

            dispatch(message("Folder saved.", "success"));

            const updatedFolders = FoldersServices.setFolder(
                updatedFolder,
                folders
            );
            dispatch({
                type: ACT_TYPES.FOLDERS_UPDATE_COMPLETE,
                folders: updatedFolders
            });
        } else {
            dispatch({
                type: ACT_TYPES.FOLDERS_ADD_BEGIN
            });
            try {
                const newFolder = await FoldersServices.apiAddFolder(
                    folderInfo.name
                );
                dispatch(message("Folder added.", "success"));

                const updatedFolders = FoldersServices.setFolder(
                    newFolder,
                    folders
                );
                dispatch({
                    type: ACT_TYPES.FOLDERS_ADD_COMPLETE,
                    folders: updatedFolders
                });
            } catch (err) {
                console.error(err);
            }
        }
    };
}

export function folderDelete(folderID: Types.TFolderID) {
    return async (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { folders } = getState().foldersStore;
        dispatch({
            type: ACT_TYPES.FOLDERS_DELETE_BEGIN
        });

        try {
            await FoldersServices.apiDeleteFolder(folderID);

            dispatch(message("Folder removed.", "success"));

            const updatedFolders = FoldersServices.removeFolderFromOrderedMap(
                folderID,
                folders
            );

            dispatch({
                type: ACT_TYPES.FOLDERS_DELETE_COMPLETE,
                folders: updatedFolders
            });
            dispatch(filterReset());
            dispatch(feedsGetAll());
        } catch (err) {
            console.error(err);
        }
    };
}

export function foldersReorder(foldersArr: Types.IFolder[]) {
    return async (dispatch: Types.IDispatch) => {
        try {
            await FoldersServices.apiReorderFolders(foldersArr);
            dispatch(message("Folders reordered.", "success"));
            dispatch(foldersGetAll());
        } catch (err) {
            console.error(err);
        }
    };
}

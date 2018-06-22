import * as ACT_TYPES from "../actiontypes";

import { IFolderAction } from "../../types";
import { FOLDERS_INITIAL_STATE } from "../initialstate";

const foldersReducer = function(
    state = FOLDERS_INITIAL_STATE,
    action: IFolderAction
) {
    switch (action.type) {
        case ACT_TYPES.FOLDERS_FETCHING:
            return {
                ...state,
                isFetchingFolders: true
            };
        case ACT_TYPES.FOLDERS_RECEIVED:
            return {
                ...state,
                folders: action.folders,
                hasFolders: true
            };
        case ACT_TYPES.FOLDERS_ADD_BEGIN:
            return {
                ...state,
                isSavingFolder: true
            };
        case ACT_TYPES.FOLDERS_ADD_COMPLETE: {
            return {
                ...state,
                folders: action.folders,
                isSavingFolder: false
            };
        }
        case ACT_TYPES.FOLDERS_DELETE_BEGIN:
            return {
                ...state,
                isDeletingFolder: true
            };
        case ACT_TYPES.FOLDERS_DELETE_COMPLETE: {
            return {
                ...state,
                folders: action.folders,
                isDeletingFolder: false
            };
        }
        case ACT_TYPES.FOLDERS_UPDATE_BEGIN: {
            return {
                ...state,
                isSavingFolder: true
            };
        }
        case ACT_TYPES.FOLDERS_UPDATE_COMPLETE: {
            return {
                ...state,
                folders: action.folders,
                isSavingFolder: false
            };
        }
        default:
            return state;
    }
};

export default foldersReducer;

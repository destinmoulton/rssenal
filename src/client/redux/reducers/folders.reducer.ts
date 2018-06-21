import { Map, OrderedMap } from "immutable";

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
    TFolderID,
    IFolder,
    IFolderAction,
    IReducerStateFolders
} from "../../types";

const INITIAL_STATE: IReducerStateFolders = {
    folders: OrderedMap<TFolderID, IFolder>(),
    hasFolders: false,
    isDeletingFolder: false,
    isFetchingFolders: false,
    isSavingFolder: false
};

const foldersReducer = function(state = INITIAL_STATE, action: IFolderAction) {
    switch (action.type) {
        case FOLDERS_FETCHING:
            return {
                ...state,
                isFetchingFolders: true
            };
        case FOLDERS_RECEIVED:
            return {
                ...state,
                folders: action.folders,
                hasFolders: true
            };
        case FOLDERS_ADD_BEGIN:
            return {
                ...state,
                isSavingFolder: true
            };
        case FOLDERS_ADD_COMPLETE: {
            return {
                ...state,
                folders: action.folders,
                isSavingFolder: false
            };
        }
        case FOLDERS_DELETE_BEGIN:
            return {
                ...state,
                isDeletingFolder: true
            };
        case FOLDERS_DELETE_COMPLETE: {
            return {
                ...state,
                folders: action.folders,
                isDeletingFolder: false
            };
        }
        case FOLDERS_UPDATE_BEGIN: {
            return {
                ...state,
                isSavingFolder: true
            };
        }
        case FOLDERS_UPDATE_COMPLETE: {
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

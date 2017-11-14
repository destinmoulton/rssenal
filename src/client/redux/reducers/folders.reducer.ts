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

import { TFolderID, IFolder, IFolderAction, IReducerStateFolders } from "../../interfaces";

const INITIAL_STATE: IReducerStateFolders = {
    folders: OrderedMap<TFolderID, IFolder>(),
    hasFolders: false,
    isDeletingFolder: false,
    isFetchingFolders: false,
    isSavingFolder: false
};

const UNCATEGORIZED_FOLDER = {
    _id: "",
    name: "Uncategorized",
    order: Infinity
};

const foldersReducer = function(state = INITIAL_STATE, action: IFolderAction){
    switch(action.type){
        case FOLDERS_FETCHING:
            return {
                ...state,
                isFetchingFolders: true
            }
        case FOLDERS_RECEIVED:
            const arrayMap = action.folders.map((folder)=>{
                return [folder._id, folder];
            });
            const mappedFolders = OrderedMap(arrayMap);
            const fullFolders = mappedFolders.set(UNCATEGORIZED_FOLDER._id, UNCATEGORIZED_FOLDER);
            
            return {
                ...state,
                folders: fullFolders,
                hasFolders: true
            }
        case FOLDERS_ADD_BEGIN:
            return {
                ...state,
                isSavingFolder: true
            }
        case FOLDERS_ADD_COMPLETE: {
            const folders = state.folders.set(action.folder._id, action.folder);
            return {
                ...state,
                folders,
                isSavingFolder: false
            }
        }
        case FOLDERS_DELETE_BEGIN: 
            return {
                ...state,
                isDeletingFolder: true
            }
        case FOLDERS_DELETE_COMPLETE: {
            const folders = state.folders.delete(action.folderId);

            return {
                ...state,
                folders,
                isDeletingFolder: false
            }
        }
        case FOLDERS_UPDATE_BEGIN: {
            return {
                ...state,
                isSavingFolder: true
            }
        }
        case FOLDERS_UPDATE_COMPLETE: {
            const folders = state.folders.set(action.folder._id, action.folder);
            
            return {
                ...state,
                folders,
                isSavingFolder: false
            }
        }
        default:
            return state;
    }
}

export default foldersReducer;
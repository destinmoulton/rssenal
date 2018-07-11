import { OrderedMap } from "immutable";
import { API_FOLDERS_BASE, API_FOLDERS_GET_ALL } from "../apiendpoints";
import { UNCATEGORIZED_FOLDER } from "../../constants";
import { generateJWTJSONHeaders, generateJWTHeaders } from "../../lib/headers";

import * as Types from "../../types";

export async function apiAddFolder(newFolderName: string) {
    const url = API_FOLDERS_BASE;
    const init = {
        method: "POST",
        body: JSON.stringify({ name: newFolderName }),
        headers: generateJWTJSONHeaders()
    };
    return fetch(url, init)
        .then(res => {
            return res.json();
        })
        .then(resObj => {
            if (resObj.status === "error") {
                throw new Error("Failed to add folder.");
            } else {
                return resObj;
            }
        })
        .catch(err => {
            throw err;
        });
}

export async function apiDeleteFolder(folderID: Types.TFolderID) {
    const url = API_FOLDERS_BASE + folderID;
    const init = {
        method: "DELETE",
        headers: generateJWTHeaders()
    };
    return fetch(url, init)
        .then(res => {
            return res.json();
        })
        .then(resObj => {
            if (resObj.status === "success") {
                return true;
            } else {
                throw new Error("Failed to remove folder.");
            }
        })
        .catch(err => {
            throw err;
        });
}

export async function apiGetAllFolders() {
    const url = API_FOLDERS_GET_ALL;
    const init = {
        method: "GET",
        headers: generateJWTHeaders()
    };
    return fetch(url, init)
        .then(res => {
            return res.json();
        })
        .then(folders => {
            return folders;
        })
        .catch(err => {
            throw err;
        });
}

export async function apiReorderFolders(foldersArr: Types.IFolder[]) {
    const url = API_FOLDERS_BASE;
    const init = {
        method: "PUT",
        body: JSON.stringify({ folders: foldersArr }),
        headers: generateJWTJSONHeaders()
    };
    return fetch(url, init)
        .then(res => {
            return res.json();
        })
        .then(resObj => {
            if (resObj.status === "success") {
                return true;
            } else {
                throw new Error("Failed to reorder folders.");
            }
        })
        .catch(err => {
            throw err;
        });
}

export async function apiSaveFolder(folderInfo: Types.IFolder) {
    const url = API_FOLDERS_BASE + folderInfo._id;
    const init = {
        method: "PUT",
        body: JSON.stringify({ name: folderInfo.name }),
        headers: generateJWTJSONHeaders()
    };

    return fetch(url, init)
        .then(res => {
            return res.json();
        })
        .then(resObj => {
            if (resObj.status === "error") {
                throw new Error("Failed to save folder.");
            } else {
                return resObj;
            }
        })
        .catch(err => {
            throw err;
        });
}

export function convertRawFoldersToOrderedMap(
    foldersArr: Types.IFolder[]
): Types.TFolders {
    const arrayMap = foldersArr.map(folder => {
        return [folder._id, folder];
    });
    const mappedFolders: Types.TFolders = OrderedMap(arrayMap);
    return mappedFolders.set(UNCATEGORIZED_FOLDER._id, UNCATEGORIZED_FOLDER);
}

export function setFolder(
    folder: Types.IFolder,
    folders: Types.TFolders
): Types.TFolders {
    return folders.set(folder._id, folder);
}

export function removeFolderFromOrderedMap(
    folderID: Types.TFolderID,
    folders: Types.TFolders
) {
    return folders.delete(folderID);
}

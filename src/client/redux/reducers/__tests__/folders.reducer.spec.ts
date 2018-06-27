import * as ACT_TYPES from "../../actiontypes";
import DATA_FOLDERS from "../../../../../test/data/immutable/folders";
import foldersReducer from "../folders.reducer";

import { FOLDERS_INITIAL_STATE } from "../../initialstate";
import * as Types from "../../../types";

describe("folders reducer", () => {
    it("should return initial state", () => {
        const reduction = foldersReducer(undefined, { type: null });

        expect(reduction).toEqual(FOLDERS_INITIAL_STATE);
    });

    it("should reduce FOLDERS_FETCHING", () => {
        const action: Types.IFolderAction = {
            type: ACT_TYPES.FOLDERS_FETCHING
        };
        const reduction = foldersReducer(undefined, action);
        expect(reduction).toEqual({
            ...FOLDERS_INITIAL_STATE,
            isFetchingFolders: true
        });
    });

    it("should reduce FOLDERS_RECEIVED", () => {
        const action: Types.IFolderAction = {
            type: ACT_TYPES.FOLDERS_RECEIVED,
            folders: DATA_FOLDERS
        };
        const reduction = foldersReducer(undefined, action);
        expect(reduction).toEqual({
            ...FOLDERS_INITIAL_STATE,
            isFetchingFolders: false,
            hasFolders: true,
            folders: DATA_FOLDERS
        });
    });

    it("should reduce FOLDERS_ADD_BEGIN", () => {
        const action: Types.IFolderAction = {
            type: ACT_TYPES.FOLDERS_ADD_BEGIN
        };
        const reduction = foldersReducer(undefined, action);
        expect(reduction).toEqual({
            ...FOLDERS_INITIAL_STATE,
            isSavingFolder: true
        });
    });

    it("should reduce FOLDERS_ADD_COMPLETE", () => {
        const action: Types.IFolderAction = {
            type: ACT_TYPES.FOLDERS_ADD_COMPLETE,
            folders: DATA_FOLDERS
        };
        const reduction = foldersReducer(undefined, action);
        expect(reduction).toEqual({
            ...FOLDERS_INITIAL_STATE,
            isSavingFolder: false,
            folders: DATA_FOLDERS
        });
    });

    it("should reduce FOLDERS_DELETE_BEGIN", () => {
        const action: Types.IFolderAction = {
            type: ACT_TYPES.FOLDERS_DELETE_BEGIN
        };
        const reduction = foldersReducer(undefined, action);
        expect(reduction).toEqual({
            ...FOLDERS_INITIAL_STATE,
            isDeletingFolder: true
        });
    });

    it("should reduce FOLDERS_DELETE_COMPLETE", () => {
        const action: Types.IFolderAction = {
            type: ACT_TYPES.FOLDERS_DELETE_COMPLETE,
            folders: DATA_FOLDERS
        };
        const reduction = foldersReducer(undefined, action);
        expect(reduction).toEqual({
            ...FOLDERS_INITIAL_STATE,
            isDeletingFolder: false,
            folders: DATA_FOLDERS
        });
    });

    it("should reduce FOLDERS_UPDATE_BEGIN", () => {
        const action: Types.IFolderAction = {
            type: ACT_TYPES.FOLDERS_UPDATE_BEGIN
        };
        const reduction = foldersReducer(undefined, action);
        expect(reduction).toEqual({
            ...FOLDERS_INITIAL_STATE,
            isSavingFolder: true
        });
    });

    it("should reduce FOLDERS_UPDATE_COMPLETE", () => {
        const action: Types.IFolderAction = {
            type: ACT_TYPES.FOLDERS_UPDATE_COMPLETE,
            folders: DATA_FOLDERS
        };
        const reduction = foldersReducer(undefined, action);
        expect(reduction).toEqual({
            ...FOLDERS_INITIAL_STATE,
            isSavingFolder: false,
            folders: DATA_FOLDERS
        });
    });
});

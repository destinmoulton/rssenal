import * as fetchMock from "fetch-mock";
import { OrderedMap } from "immutable";
import { UNCATEGORIZED_FOLDER } from "../../../constants";

import * as FoldersServices from "../folders.services";

import FOLDER from "../../../../../test/data/folder";
import IMM_FOLDERS from "../../../../../test/data/immutable/folders";
import API_FOLDERS_STRING from "../../../../../test/data/api/folders";

describe("feeds.services", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    describe("apiAddFolder()", () => {
        it("throws an error for an error response", async () => {
            const url = "/api/folders/";
            fetchMock.postOnce(url, { body: { status: "error" } });

            expect.assertions(2);

            try {
                await FoldersServices.apiAddFolder("NEW_FOLDER_NAME");
            } catch (err) {
                expect(err).toBeInstanceOf(Error);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns the new folder for a valid response", async () => {
            const expectedFolder = { folderData: "FOLDER DATA HERE" };
            const URL = "/api/folders/";
            fetchMock.postOnce(URL, {
                body: {
                    ...expectedFolder
                }
            });

            expect.assertions(2);

            try {
                const feedInfo = await FoldersServices.apiAddFolder(
                    "NEW_FOLDER_NAME"
                );
                expect(feedInfo).toEqual(expectedFolder);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("apiDeleteFolder()", () => {
        it("throws an error for an error response", async () => {
            const url = "/api/folders/FOLDER_ID";
            fetchMock.deleteOnce(url, { body: { status: "error" } });

            expect.assertions(2);

            try {
                await FoldersServices.apiDeleteFolder("FOLDER_ID");
            } catch (err) {
                expect(err).toBeInstanceOf(Error);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns the new feed for a valid response", async () => {
            const expectedFeed = { feedData: "FEED DATA HERE" };
            const url = "/api/folders/FOLDER_ID";
            fetchMock.deleteOnce(url, {
                body: {
                    status: "success"
                }
            });

            expect.assertions(2);

            try {
                const res = await FoldersServices.apiDeleteFolder("FOLDER_ID");
                expect(res).toBe(true);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("apiGetAllFolders()", () => {
        it("returns the folders for a valid response", async () => {
            const expectedFolders = ["folder1", "folder2"];
            const url = "/api/folders/";
            fetchMock.getOnce(url, {
                ...expectedFolders
            });

            expect.assertions(2);

            try {
                const res = await FoldersServices.apiGetAllFolders();
                expect(res).toEqual(expectedFolders);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("apiReorderFolders()", () => {
        it("throws an error for an error response", async () => {
            const url = "/api/folders/";
            fetchMock.putOnce(url, { body: { status: "error" } });

            expect.assertions(2);

            try {
                await FoldersServices.apiReorderFolders(IMM_FOLDERS.toArray());
            } catch (err) {
                expect(err).toBeInstanceOf(Error);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns the true a valid response", async () => {
            const expectedFeed = { feed: "UPDATED FEED" };

            const url = "/api/folders/";
            fetchMock.putOnce(url, {
                body: {
                    status: "success"
                }
            });

            expect.assertions(2);

            try {
                const res = await FoldersServices.apiReorderFolders(
                    IMM_FOLDERS.toArray()
                );
                expect(res).toEqual(true);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("apiSaveFolder()", () => {
        it("throws an error for an error response", async () => {
            const folderID = "5b33c4bab2438d5708dc1967";
            const url = "/api/folders/" + folderID;
            fetchMock.putOnce(url, { body: { status: "error" } });

            expect.assertions(2);

            try {
                await FoldersServices.apiSaveFolder(FOLDER);
            } catch (err) {
                expect(err).toBeInstanceOf(Error);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            }
        });

        it("returns the updated feed for a valid response", async () => {
            const expectedFolder = { folder_stuff: "UPDATED FOLDER" };
            const folderID = "5b33c4bab2438d5708dc1967";
            const url = "/api/folders/" + folderID;
            fetchMock.putOnce(url, {
                body: {
                    ...expectedFolder
                }
            });

            expect.assertions(2);

            try {
                const res = await FoldersServices.apiSaveFolder(FOLDER);
                expect(res).toEqual(expectedFolder);

                await fetchMock.flush();
                expect(fetchMock.done()).toBe(true);
            } catch (err) {
                throw err;
            }
        });
    });

    it("convertRawFoldersToOrderedMap() returns an OrderedMap<> of folders", () => {
        const foldersArr = JSON.parse(API_FOLDERS_STRING);
        const foldersOM = FoldersServices.convertRawFoldersToOrderedMap(
            foldersArr
        );

        // add the "Uncategorized" folder
        const fullExpectedOM = IMM_FOLDERS.set(
            UNCATEGORIZED_FOLDER._id,
            UNCATEGORIZED_FOLDER
        );
        expect(foldersOM).toEqual(fullExpectedOM);
    });

    it("setFolder() sets a folder on the OrderedMap<> of folders", () => {
        const folderID = "5b33c4bab2438d5708dc1967";
        const CLONED_FOLDER = { ...FOLDER, name: "NEW TITLE" };
        const newFoldersOM = FoldersServices.setFolder(
            CLONED_FOLDER,
            IMM_FOLDERS
        );
        const expectedFoldersOM = IMM_FOLDERS.set(folderID, CLONED_FOLDER);
        expect(newFoldersOM).toEqual(expectedFoldersOM);
    });

    it("removeFolderFromOrderedMap() removes a folder", () => {
        const folderID = "5b33c4bab2438d5708dc1967";
        const newFoldersOM = FoldersServices.removeFolderFromOrderedMap(
            folderID,
            IMM_FOLDERS
        );

        const expectedFoldersOM = IMM_FOLDERS.remove(folderID);
        expect(newFoldersOM).toEqual(expectedFoldersOM);
    });
});

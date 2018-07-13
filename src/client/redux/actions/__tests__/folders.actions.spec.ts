import * as fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as FoldersActions from "../folders.actions";
import * as INIT_STATE from "../../initialstate";

import API_FEEDS_STRING from "../../../../../test/data/api/feeds";
import API_FOLDERS_STRING from "../../../../../test/data/api/folders";
import IMM_FOLDERS from "../../../../../test/data/immutable/folders";
import FOLDER from "../../../../../test/data/folder";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("feeds.actions", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    it("foldersGetAll() handles getting the folders", async () => {
        const folders_url = "/api/folders/";
        fetchMock.getOnce(folders_url, JSON.parse(API_FOLDERS_STRING));

        const store = mockStore({
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE
        });

        try {
            await store.dispatch(FoldersActions.foldersGetAll());
            expect(store.getActions()).toMatchSnapshot();
        } catch (err) {
            throw err;
        }
    });

    describe("folderSave()", () => {
        it("handles saving an existing folder", async () => {
            const folder_id = "5b33c4bab2438d5708dc1967";
            const folders_url = "/api/folders/" + folder_id;
            fetchMock.putOnce(folders_url, FOLDER);

            const store = mockStore({
                foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
                messagesStore: INIT_STATE.MESSAGES_INITIAL_STATE
            });

            const folderInfo = {
                _id: "5b33c4bab2438d5708dc1967",
                name: "FOLDER NAME",
                order: 99
            };

            try {
                await store.dispatch(FoldersActions.folderSave(folderInfo));

                expect(store.getActions()).toMatchSnapshot();
            } catch (err) {
                throw err;
            }
        });

        it("handles adding a new folder", async () => {
            const folders_url = "/api/folders/";
            fetchMock.postOnce(folders_url, FOLDER);

            const store = mockStore({
                foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
                messagesStore: INIT_STATE.MESSAGES_INITIAL_STATE
            });

            const folderInfo = {
                _id: "",
                name: "FOLDER NAME"
            };

            try {
                await store.dispatch(FoldersActions.folderSave(folderInfo));

                expect(store.getActions()).toMatchSnapshot();
            } catch (err) {
                throw err;
            }
        });
    });

    it("folderDelete() handles removing a folder", async () => {
        const folder_id = "5b33c4bab2438d5708dc1967";
        const delete_url = "/api/folders/" + folder_id;
        fetchMock.deleteOnce(delete_url, { body: { status: "success" } });

        const store = mockStore({
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
            messagesStore: INIT_STATE.MESSAGES_INITIAL_STATE
        });

        const feed_url = "/api/feeds/";

        fetchMock.getOnce(feed_url, JSON.parse(API_FEEDS_STRING));
        try {
            await store.dispatch(FoldersActions.folderDelete(folder_id));

            expect(store.getActions()).toMatchSnapshot();
        } catch (err) {
            throw err;
        }
    });

    it("foldersReorder() handles reordering folders", async () => {
        const reorder_url = "/api/folders/";
        fetchMock.putOnce(reorder_url, { body: { status: "success" } });

        const folders_url = "/api/folders/";
        fetchMock.getOnce(folders_url, JSON.parse(API_FOLDERS_STRING));

        const store = mockStore({
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
            messagesStore: INIT_STATE.MESSAGES_INITIAL_STATE
        });

        try {
            await store.dispatch(
                FoldersActions.foldersReorder(IMM_FOLDERS.toArray())
            );

            expect(store.getActions()).toMatchSnapshot();
        } catch (err) {
            throw err;
        }
    });
});

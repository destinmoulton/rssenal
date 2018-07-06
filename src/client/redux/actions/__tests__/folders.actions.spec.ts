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

    it("foldersGetAll() handles getting the folders", () => {
        const folders_url = "/api/folders/";
        fetchMock.getOnce(folders_url, JSON.parse(API_FOLDERS_STRING));

        const store = mockStore({
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE
        });

        return store.dispatch(FoldersActions.foldersGetAll()).then(() => {
            expect(store.getActions()).toMatchSnapshot();
        });
    });

    describe("folderSave()", () => {
        it("handles saving an existing folder", () => {
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

            return store
                .dispatch(FoldersActions.folderSave(folderInfo))
                .then(() => {
                    expect(store.getActions()).toMatchSnapshot();
                });
        });

        it("handles adding a new folder", () => {
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

            return store
                .dispatch(FoldersActions.folderSave(folderInfo))
                .then(() => {
                    expect(store.getActions()).toMatchSnapshot();
                });
        });
    });

    it("folderDelete() handles removing a folder", () => {
        const folder_id = "5b33c4bab2438d5708dc1967";
        const delete_url = "/api/folders/" + folder_id;
        fetchMock.deleteOnce(delete_url, { body: { status: "success" } });

        const store = mockStore({
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
            messagesStore: INIT_STATE.MESSAGES_INITIAL_STATE
        });

        const feed_url = "/api/feeds/";

        fetchMock.getOnce(feed_url, JSON.parse(API_FEEDS_STRING));

        return store
            .dispatch(FoldersActions.folderDelete(folder_id))
            .then(() => {
                expect(store.getActions()).toMatchSnapshot();
            });
    });

    it("foldersReorder() handles reordering folders", () => {
        const reorder_url = "/api/folders/";
        fetchMock.putOnce(reorder_url, { body: { status: "success" } });

        const folders_url = "/api/folders/";
        fetchMock.getOnce(folders_url, JSON.parse(API_FOLDERS_STRING));

        const store = mockStore({
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
            messagesStore: INIT_STATE.MESSAGES_INITIAL_STATE
        });

        return store
            .dispatch(FoldersActions.foldersReorder(IMM_FOLDERS.toArray()))
            .then(() => {
                expect(store.getActions()).toMatchSnapshot();
            });
    });
});

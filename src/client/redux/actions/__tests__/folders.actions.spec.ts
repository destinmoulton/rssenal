import * as fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as FoldersActions from "../folders.actions";
import * as INIT_STATE from "../../initialstate";

import API_FOLDERS_STRING from "../../../../../test/data/api/folders";
import IMM_FOLDERS from "../../../../../test/data/immutable/folders";

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
});

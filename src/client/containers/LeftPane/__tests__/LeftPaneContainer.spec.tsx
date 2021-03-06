import * as React from "react";
import * as fetchMock from "fetch-mock";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import LeftPaneContainer from "../LeftPaneContainer";
import * as INIT_STATE from "../../../redux/initialstate";

import API_ENTRIES_STRING from "../../../../../test/data/api/entries.unread";
import API_FEEDS_STRING from "../../../../../test/data/api/feeds";
import API_FOLDERS_STRING from "../../../../../test/data/api/folders";
import IMM_FEEDS from "../../../../../test/data/immutable/feeds";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("<LeftPaneContainer />", () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        localStorage.clear();
    });

    it("renders and matches the snapshot", async () => {
        const folders_url = "/api/folders/";
        fetchMock.getOnce(folders_url, JSON.parse(API_FOLDERS_STRING));

        const feeds_url = "/api/feeds/";
        fetchMock.getOnce(feeds_url, JSON.parse(API_FEEDS_STRING));

        const entries_url =
            "/api/entries/?showEntriesHasRead=false&feedId=5b33c76cb2438d5708dc197e";
        fetchMock.getOnce(entries_url, JSON.parse(API_ENTRIES_STRING));

        const store = mockStore({
            authStore: INIT_STATE.AUTH_INITIAL_STATE,
            entriesStore: INIT_STATE.ENTRIES_INITIAL_STATE,
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE,
                feeds: IMM_FEEDS
            },
            filterStore: INIT_STATE.FILTER_INITIAL_STATE,
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
            messagesStore: INIT_STATE.MESSAGES_INITIAL_STATE,
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        const wrapper = mount(
            <Provider store={store}>
                <LeftPaneContainer />
            </Provider>
        );

        try {
            await fetchMock.flush();

            expect(wrapper).toMatchSnapshot();
        } catch (err) {
            throw err;
        }
    });
});

import * as React from "react";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import EntriesListContainer from "../EntriesListContainer";
import * as INIT_STATE from "../../../redux/initialstate";
import AMMENDED_ENTRIES from "../../../../../test/data/immutable/ammendedEntries";
import IMM_FEEDS from "../../../../../test/data/immutable/feeds";
import IMM_FOLDERS from "../../../../../test/data/immutable/folders";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("<EntriesListContainer />", () => {
    it("renders and matches the snapshot", async () => {
        const store = mockStore({
            entriesStore: {
                ...INIT_STATE.ENTRIES_INITIAL_STATE,
                entries: AMMENDED_ENTRIES
            },
            feedsStore: {
                ...INIT_STATE.FEEDS_INITIAL_STATE,
                feeds: IMM_FEEDS
            },
            filterStore: {
                ...INIT_STATE.FILTER_INITIAL_STATE,
                filteredEntries: AMMENDED_ENTRIES
            },
            foldersStore: {
                ...INIT_STATE.FOLDERS_INITIAL_STATE,
                folders: IMM_FOLDERS
            },
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        const wrapper = mount(
            <Provider store={store}>
                <EntriesListContainer sortBy={"publish_date:asc"} />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});

import * as React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import FolderItemContainer from "../FolderItemContainer";
import * as INIT_STATE from "../../../redux/initialstate";

import folder from "../../../../../test/data/folder";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("<FolderItemContainer />", () => {
    it("renders and matches the snapshot", () => {
        const store = mockStore({
            entriesStore: INIT_STATE.ENTRIES_INITIAL_STATE,
            feedsStore: INIT_STATE.FEEDS_INITIAL_STATE,
            filterStore: INIT_STATE.FILTER_INITIAL_STATE,
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        const editFeedMock = jest.fn();
        const editFolderMock = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <FolderItemContainer
                    editFeed={editFeedMock}
                    editFolder={editFolderMock}
                    folder={folder}
                />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
});

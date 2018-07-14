import * as React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import ButtonBarContainer from "../ButtonBarContainer";
import * as INIT_STATE from "../../../redux/initialstate";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("<ButtonBarContainer />", () => {
    it("renders and matches the snapshot", () => {
        const state = {};
        const store = mockStore({
            entriesStore: INIT_STATE.ENTRIES_INITIAL_STATE,
            feedsStore: INIT_STATE.FEEDS_INITIAL_STATE,
            filterStore: INIT_STATE.FILTER_INITIAL_STATE,
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE,
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        const openAddFeedModalMock = jest.fn;
        const openEditFolderModal = jest.fn;
        const wrapper = mount(
            <Provider store={store}>
                <ButtonBarContainer
                    openAddFeedModal={openAddFeedModalMock}
                    openEditFolderModal={openEditFolderModal}
                />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
});

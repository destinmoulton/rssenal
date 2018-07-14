import * as React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import ReorderFoldersModalContainer from "../ReorderFoldersModalContainer";
import * as INIT_STATE from "../../../redux/initialstate";
import IMM_FOLDERS from "../../../../../test/data/immutable/folders";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("<ReorderFoldersModalContainer />", () => {
    it("renders and matches the snapshot", () => {
        const store = mockStore({
            foldersStore: {
                ...INIT_STATE.FOLDERS_INITIAL_STATE,
                folders: IMM_FOLDERS
            }
        });

        const wrapper = mount(
            <Provider store={store}>
                <ReorderFoldersModalContainer />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
});

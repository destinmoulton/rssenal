import * as React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import SettingsModalContainer from "../SettingsModalContainer";
import * as INIT_STATE from "../../../redux/initialstate";
import IMM_FOLDERS from "../../../../../test/data/immutable/folders";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("<SettingsModalContainer />", () => {
    it("renders and matches the snapshot", () => {
        const store = mockStore({
            settingsStore: INIT_STATE.SETTINGS_INITIAL_STATE
        });

        const wrapper = mount(
            <Provider store={store}>
                <SettingsModalContainer />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
});

import * as React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import EditFeedModalContainer from "../EditFeedModalContainer";
import * as INIT_STATE from "../../../redux/initialstate";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("<EditFeedModalContainer />", () => {
    it("renders and matches the snapshot", () => {
        const store = mockStore({
            foldersStore: INIT_STATE.FOLDERS_INITIAL_STATE
        });

        const wrapper = mount(
            <Provider store={store}>
                <EditFeedModalContainer />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
});

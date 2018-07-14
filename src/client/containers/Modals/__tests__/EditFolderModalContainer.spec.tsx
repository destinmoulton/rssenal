import * as React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import EditFolderModalContainer from "../EditFolderModalContainer";
import * as INIT_STATE from "../../../redux/initialstate";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("<EditFolderModalContainer />", () => {
    it("renders and matches the snapshot", () => {
        const store = mockStore({});

        const wrapper = mount(
            <Provider store={store}>
                <EditFolderModalContainer />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
});

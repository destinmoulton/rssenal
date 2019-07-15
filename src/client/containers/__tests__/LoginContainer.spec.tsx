import * as React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import LoginContainer from "../LoginContainer";
import * as INIT_STATE from "../../redux/initialstate";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("<LoginContainer />", () => {
    it("renders and matches the snapshot", () => {
        const store = mockStore({
            authStore: INIT_STATE.AUTH_INITIAL_STATE
        });

        const wrapper = mount(
            <Provider store={store}>
                <LoginContainer />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
});

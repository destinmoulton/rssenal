import * as React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import WindowContainer from "../WindowContainer";
import * as INIT_STATE from "../../redux/initialstate";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("<WindowContainer />", () => {
    it("renders and matches the snapshot", () => {
        const store = mockStore({
            authStore: INIT_STATE.AUTH_INITIAL_STATE
        });

        const wrapper = mount(
            <Provider store={store}>
                <WindowContainer />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
});

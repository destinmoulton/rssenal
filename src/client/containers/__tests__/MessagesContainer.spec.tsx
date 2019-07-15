import * as React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";

import MessagesContainer from "../MessagesContainer";
import * as INIT_STATE from "../../redux/initialstate";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("<MessagesContainer />", () => {
    it("renders and matches the snapshot", () => {
        const store = mockStore({
            messagesStore: INIT_STATE.MESSAGES_INITIAL_STATE
        });

        const wrapper = mount(
            <Provider store={store}>
                <MessagesContainer />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
});

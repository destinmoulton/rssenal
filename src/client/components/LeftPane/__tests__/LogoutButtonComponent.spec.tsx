import * as React from "react";

import { shallow } from "enzyme";
import LogoutButtonComponent from "../LogoutButtonComponent";

describe("<LogoutButtonComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <LogoutButtonComponent logoutUser={jest.fn()} />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

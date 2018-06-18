import * as React from "react";
import { shallow } from "enzyme";
import * as Types from "../../types";
import LoginComponent from "../LoginComponent";

describe("<LoginComponent />", () => {
    it("renders and matches snapshot", () => {
        const wrapper = shallow(
            <LoginComponent
                authenticationError={"Test Error"}
                loginUser={jest.fn()}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});

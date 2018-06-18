import * as React from "react";
import { shallow } from "enzyme";

import WindowComponent from "../WindowComponent";

describe("<WindowComponent />", () => {
    it("renders and matches snapshot", () => {
        const wrapper = shallow(<WindowComponent />);

        expect(wrapper).toMatchSnapshot();
    });
});

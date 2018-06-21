import * as React from "react";
import { shallow } from "enzyme";

import Browser from "../Browser";

describe("<Browser />", () => {
    it("renders a snapshot", () => {
        const wrapper = shallow(<Browser />);

        expect(wrapper).toMatchSnapshot();
    });
});

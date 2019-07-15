import * as React from "react";
import { shallow } from "enzyme";

import MessagesComponent from "../MessagesComponent";

describe("<MessagesComponent />", () => {
    it("renders and matches snapshot", () => {
        const wrapper = shallow(<MessagesComponent />);

        expect(wrapper).toMatchSnapshot();
    });
});

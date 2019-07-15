import * as React from "react";
import { shallow } from "enzyme";

import RightPaneComponent from "../RightPaneComponent";

describe("<RightPaneComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <RightPaneComponent filterTitle={"TEST_FILTER_TITLE"} />
        );

        expect(wrapper).toMatchSnapshot();
    });
});

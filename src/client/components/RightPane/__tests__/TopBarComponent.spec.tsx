import * as React from "react";
import { shallow } from "enzyme";

import TopBarComponent from "../TopBarComponent";

describe("<TopBarComponent />", () => {
    it("matches the snapshot", () => {
        const title = "Test Title";
        const onChangeMock = jest.fn();
        const sortBy = "sort:byTest";
        const wrapper = shallow(
            <TopBarComponent
                title={title}
                onChangeSort={onChangeMock}
                sortBy={sortBy}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});

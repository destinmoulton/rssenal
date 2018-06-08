import * as React from "react";

import { mount } from "enzyme";

import SortMenu from "../SortMenu";

describe("<SortMenu />", () => {
    it("matches snapshot", () => {
        const mockChange = jest.fn();
        const wrapper = mount(
            <SortMenu
                currentSortBy={"publish_date:asc"}
                onChange={mockChange}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

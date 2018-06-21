import * as React from "react";

import { shallow } from "enzyme";

import ButtonBarComponent from "../ButtonBarComponent";
import { Button } from "semantic-ui-react";
describe("<ButtonBarComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <ButtonBarComponent
                feedsRefreshAll={jest.fn()}
                openAddFeedModal={jest.fn()}
                openEditFolderModal={jest.fn()}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

import * as React from "react";

import { shallow } from "enzyme";

import AddFeedModalComponent from "../AddFeedModalComponent";

import folders from "../../../../../test/data/folders";

describe("<AddFeedModalComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <AddFeedModalComponent
                folders={folders}
                beginAddFeed={jest.fn()}
                isModalOpen={true}
                onCloseModal={jest.fn()}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

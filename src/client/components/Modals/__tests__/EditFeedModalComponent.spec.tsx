import * as React from "react";

import { shallow } from "enzyme";

import EditFeedModalComponent from "../EditFeedModalComponent";

import feed from "../../../../../test/data/feed";
import folders from "../../../../../test/data/folders";

describe("<EditFeedModalComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <EditFeedModalComponent
                folders={folders}
                feed={feed}
                feedInitiateUpdate={jest.fn()}
                isModalOpen={true}
                onCloseModal={jest.fn()}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

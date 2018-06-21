import * as React from "react";

import { shallow } from "enzyme";
import ListFeeds from "../ListFeeds";

import feeds from "../../../../../test/data/feeds";

describe("<ListFeeds />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <ListFeeds
                feeds={feeds}
                editFeed={jest.fn()}
                folderId={"5a54f74838e78863ac6a8961"}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

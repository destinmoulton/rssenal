import { Map } from "immutable";
import * as React from "react";

import { shallow } from "enzyme";
import * as Types from "../../../types";
import FeedItemComponent from "../FeedItemComponent";

import feed from "../../../../../test/data/feed";

const FILTER = {
    id: feed._id,
    limit: "feed"
};

const UNREAD_MAP: Types.TUnreadMapFeeds = Map([[feed._id, 10]]);
describe("<FeedItemComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <FeedItemComponent
                beginDeleteFeed={jest.fn()}
                filterChangeActive={jest.fn()}
                editFeed={jest.fn()}
                feed={feed}
                filter={FILTER}
                unreadMapFeeds={UNREAD_MAP}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

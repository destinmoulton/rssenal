import { OrderedMap } from "immutable";
import * as React from "react";

import { shallow } from "enzyme";

import LeftPaneComponent from "../LeftPaneComponent";
import feeds from "../../../../../test/data/immutable/feeds";
import folders from "../../../../../test/data/immutable/folders";

describe("<LeftPaneComponent />", () => {
    describe("renders and matches the snapshot", () => {
        it("matches snapshot when hasFolders = false", () => {
            const wrapper = shallow(
                <LeftPaneComponent
                    foldersGetAll={jest.fn()}
                    feedsGetAll={jest.fn()}
                    folders={OrderedMap()}
                    feeds={feeds}
                    hasFolders={false}
                />
            );
            expect(wrapper).toMatchSnapshot();
        });
        it("matches snapshot when hasFolders = true", () => {
            const wrapper = shallow(
                <LeftPaneComponent
                    foldersGetAll={jest.fn()}
                    feedsGetAll={jest.fn()}
                    folders={folders}
                    feeds={feeds}
                    hasFolders={true}
                />
            );
            expect(wrapper).toMatchSnapshot();
        });
    });
});

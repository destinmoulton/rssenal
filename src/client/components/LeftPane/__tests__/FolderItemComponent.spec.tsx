import { Map } from "immutable";
import * as React from "react";

import { shallow } from "enzyme";
import * as Types from "../../../types";
import FolderItemComponent from "../FolderItemComponent";
import feeds from "../../../../../test/data/immutable/feeds";
import folder from "../../../../../test/data/folder";

const FILTER = {
    id: folder._id,
    limit: "folder"
};

const UNREAD_MAP: Types.TUnreadMapFolders = Map([[folder._id, 20]]);
describe("<FolderItemComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <FolderItemComponent
                entriesRemoveRead={jest.fn()}
                folderDelete={jest.fn()}
                filterChange={jest.fn()}
                filterVisibleEntries={jest.fn()}
                editFeed={jest.fn()}
                editFolder={jest.fn()}
                folder={folder}
                feeds={feeds}
                filter={FILTER}
                unreadMapGroups={UNREAD_MAP}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

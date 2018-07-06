import * as React from "react";

import { shallow } from "enzyme";

import ReorderFoldersModalComponent from "../ReorderFoldersModalComponent";

import folders from "../../../../../test/data/immutable/folders";

describe("<ReorderFoldersModalComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <ReorderFoldersModalComponent
                folders={folders}
                foldersReorder={jest.fn()}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

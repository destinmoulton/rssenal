import * as React from "react";

import { shallow } from "enzyme";

import SelectFolder from "../SelectFolder";
import folder from "../../../../../test/data/folder";
import folders from "../../../../../test/data/immutable/folders";

describe("<SelectFolder />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <SelectFolder
                folders={folders}
                selectedValue={folder._id}
                onChange={jest.fn()}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

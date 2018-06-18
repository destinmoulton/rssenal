import * as React from "react";
import { shallow } from "enzyme";
import EntriesListComponent from "../EntriesListComponent";

import entries from "../../../../../test/data/entries";

describe("<EntriesListComponent />", () => {
    it("renders and matches the snapshot", () => {
        feeds;
        filter;
        settings;
        filteredEntries;
        const wrapper = shallow(<EntriesListComponent entries={entries} />);
        expect(wrapper).toMatchSnapshot();
    });
});

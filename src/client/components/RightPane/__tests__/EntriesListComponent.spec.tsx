import * as React from "react";
import { shallow } from "enzyme";
import EntriesListComponent from "../EntriesListComponent";

import ENTRIES from "../../../../../test/data/immutable/ammendedEntries";
import FEEDS from "../../../../../test/data/immutable/feeds";
import SETTINGS_DATA from "../../../../../test/data/immutable/settings";
const FILTER = {
    limit: "all"
};

describe("<EntriesListComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <EntriesListComponent
                entries={ENTRIES}
                feeds={FEEDS}
                filter={FILTER}
                filteredEntries={ENTRIES}
                settings={SETTINGS_DATA}
                markEntryRead={jest.fn()}
                sortBy={"publish_date:asc"}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

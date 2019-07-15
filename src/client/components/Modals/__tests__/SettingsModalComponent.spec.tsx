import * as React from "react";

import { shallow } from "enzyme";

import SettingsModalComponent from "../SettingsModalComponent";

import settings from "../../../../../test/data/immutable/settings";

describe("<SettingsModalComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <SettingsModalComponent
                settings={settings}
                settingChange={jest.fn()}
                feedsRefreshAll={jest.fn()}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

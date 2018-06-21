import * as React from "react";

import { shallow } from "enzyme";

import SettingsModalComponent from "../SettingsModalComponent";

import settings from "../../../../../test/data/settings";

describe("<SettingsModalComponent />", () => {
    it("renders and matches the snapshot", () => {
        const wrapper = shallow(
            <SettingsModalComponent
                settings={settings}
                settingChange={jest.fn()}
                refreshAllFeeds={jest.fn()}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

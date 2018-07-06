import { Map } from "immutable";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as SettingsActions from "../settings.actions";
import * as ACT_TYPES from "../../actiontypes";
import { SETTINGS_INITIAL_STATE } from "../../initialstate";
import { DEFAULT_SETTINGS } from "../../../constants";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("settings redux actions", () => {
    afterEach(() => {});

    it("settingChange action fires SETTINGS_CHANGE", () => {
        let expectedSettings = DEFAULT_SETTINGS.slice();
        expectedSettings[0][1]["value"] = false;
        const expectedActions = [
            { type: ACT_TYPES.SETTINGS_CHANGE, settings: Map(expectedSettings) }
        ];

        const store = mockStore({ settingsStore: SETTINGS_INITIAL_STATE });

        store.dispatch(SettingsActions.settingChange("show_images", false));

        expect(store.getActions()).toEqual(expectedActions);
    });
});

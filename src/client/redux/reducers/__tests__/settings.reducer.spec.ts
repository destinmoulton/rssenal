import { Map } from "immutable";

import * as ACT_TYPES from "../../actiontypes";
import {
    SETTING_SHOW_IMAGES,
    SETTING_SHOW_ENTRIES_READ
} from "../../../constants";
import { SETTINGS_INITIAL_STATE } from "../../initialstate";
import settingsReducer from "../settings.reducer";
import * as Types from "../../../types";

describe("settings reducer", () => {
    it("should return initial state", () => {
        const reduction = settingsReducer(undefined, {
            type: null
        });

        expect(reduction).toEqual(SETTINGS_INITIAL_STATE);
    });

    it("should reduce SETTINGS_CHANGE", () => {
        const TEST_SETTINGS: Types.TSettings = Map([
            [
                SETTING_SHOW_IMAGES,
                {
                    name: "Show Images",
                    type: "toggle",
                    refresh_entries_on_change: false,
                    value: false
                }
            ],
            [
                SETTING_SHOW_ENTRIES_READ,
                {
                    name: "Show Entries Already Read",
                    type: "toggle",
                    refresh_entries_on_change: true,
                    value: true
                }
            ]
        ]);
        const reduction = settingsReducer(undefined, {
            type: ACT_TYPES.SETTINGS_CHANGE,
            settings: TEST_SETTINGS
        });

        expect(reduction).toEqual({ settings: TEST_SETTINGS });
    });
});

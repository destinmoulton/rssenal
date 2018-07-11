import { Map } from "immutable";
import * as SettingsServices from "../settings.services";
import * as Types from "../../../types";

describe("settings.services", () => {
    it("addSetting() adds a setting to the setting Map ", () => {
        const settingTemplate = {
            name: "SETTING_NAME",
            type: "TYPE",
            value: "INIT_SETTING",
            refresh_entries_on_change: false
        };
        const initialSettings: Types.TSettings = Map([
            ["SETTING_KEY", settingTemplate]
        ]);
        const expectedSettings = initialSettings.set("SETTING_KEY", {
            ...settingTemplate,
            value: "NEW_VALUE"
        });
        const settings = SettingsServices.addSetting(
            initialSettings,
            "SETTING_KEY",
            "NEW_VALUE"
        );
        expect(settings).toEqual(expectedSettings);
    });
});

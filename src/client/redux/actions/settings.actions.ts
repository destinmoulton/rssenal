import { SETTINGS_CHANGE } from "../actiontypes";

import * as SettingsServices from "../services/settings.services";
import * as Types from "../../types";

export function settingChange(setting_key: string, setting_value: any) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { settingsStore } = getState();
        const { settings } = settingsStore;

        const updatedSettings = SettingsServices.addSetting(
            settings,
            setting_key,
            setting_value
        );

        dispatch(settingsChangeAll(updatedSettings));
    };
}

function settingsChangeAll(settings: Types.TSettings) {
    return {
        type: SETTINGS_CHANGE,
        settings
    };
}

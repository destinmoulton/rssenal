import { SETTINGS_CHANGE } from "../actiontypes";

import * as Types from "../../interfaces";

export function settingChange(setting_key: string, setting_value: any) {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { settingsStore } = getState();

        const { settings } = settingsStore;

        const setting = settings.get(setting_key);

        setting.value = setting_value;

        const newSettings = settings.set(setting_key, setting);

        dispatch(settingsChangeAll(newSettings));
    };
}

function settingsChangeAll(settings: Types.TSettings) {
    return {
        type: SETTINGS_CHANGE,
        settings
    };
}

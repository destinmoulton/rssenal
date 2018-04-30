import { SETTINGS_CHANGE } from "../actiontypes";

import { ISettingsAction, IReducerStateSettings } from "../../interfaces";

const INITIAL_STATE: IReducerStateSettings = {
    settings: [
        {
            key: "show_images",
            name: "Show Images",
            type: "toggle",
            refresh_entries_on_change: false,
            value: true
        },
        {
            key: "show_entries_has_read",
            name: "Show Entries Already Read",
            type: "toggle",
            refresh_entries_on_change: true,
            value: false
        }
    ]
};

function settingsReducer(state = INITIAL_STATE, action: ISettingsAction) {
    switch (action.type) {
        case SETTINGS_CHANGE:
            const { settings } = state;

            const newSettings = settings.map(setting => {
                if (setting.key === action.setting_key) {
                    const newSetting = { ...setting };
                    newSetting.value = action.setting_value;
                    return newSetting;
                } else {
                    return setting;
                }
            });
            return {
                ...state,
                settings: newSettings
            };
        default:
            return { ...state };
    }
}

export default settingsReducer;

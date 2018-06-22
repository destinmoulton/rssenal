import { SETTINGS_CHANGE } from "../actiontypes";
import { SETTINGS_INITIAL_STATE } from "../initialstate";
import * as Types from "../../types";

function settingsReducer(
    state = SETTINGS_INITIAL_STATE,
    action: Types.ISettingsAction
) {
    switch (action.type) {
        case SETTINGS_CHANGE:
            return {
                ...state,
                settings: action.settings
            };
        default:
            return { ...state };
    }
}

export default settingsReducer;

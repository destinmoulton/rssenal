import { Map } from "immutable";

import { SETTINGS_CHANGE } from "../actiontypes";
import { DEFAULT_SETTINGS } from "../../constants";

import * as Types from "../../interfaces";

const INITIAL_STATE: Types.IReducerStateSettings = {
    settings: Map(DEFAULT_SETTINGS)
};

function settingsReducer(state = INITIAL_STATE, action: Types.ISettingsAction) {
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

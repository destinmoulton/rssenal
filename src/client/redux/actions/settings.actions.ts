import {
    SETTINGS_CHANGE
} from "../actiontypes";

export function changeSetting(setting_key, setting_value){
    return {
        type: SETTINGS_CHANGE,
        setting_key,
        setting_value
    }
}
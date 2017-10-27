import {
    SETTINGS_CHANGE
} from "../actiontypes";

export function changeSetting(setting_key: string, setting_value: any){
    return {
        type: SETTINGS_CHANGE,
        setting_key,
        setting_value
    }
}
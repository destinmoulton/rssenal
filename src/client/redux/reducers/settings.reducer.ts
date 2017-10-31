
import {
    SETTINGS_CHANGE
} from "../actiontypes";

import { ISettingsAction, IReducerStateSettings} from "../../interfaces";

const INITIAL_STATE: IReducerStateSettings = {
    settings: [
        {
            key: "show_images",
            name: "Show Images",
            type: "toggle",
            value: true
        },
        {
            key: "show_unread",
            name: "Show Unread",
            type: "toggle",
            value: true
        }          
    ]
};

function settingsReducer(state = INITIAL_STATE, action: ISettingsAction){
    switch(action.type){
        case SETTINGS_CHANGE:
            const { settings } = state;

            const newSettings = settings.map((setting)=>{
                if(setting.key === action.setting_key){
                    const newSetting = {...setting};
                    newSetting.value = action.setting_value;
                    return newSetting;
                } else {
                    return setting;
                }
            });
            return {
                ...state,
                settings: newSettings
            }
        default:
            return {...state};
    }
}

export default settingsReducer;
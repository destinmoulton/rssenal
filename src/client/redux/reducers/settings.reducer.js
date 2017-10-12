
import {
    SETTINGS_CHANGE
} from "../actiontypes";

const INITIAL_STATE = {
    settings: [
        {
            key: "show_images",
            name: "Show Images",
            type: "toggle",
            value: true
        }            
    ]
};

function settingsReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case SETTINGS_CHANGE:
            const { settings } = state;

            const newSettings = settings.map((setting)=>{
                if(setting.key === action.setting_key){
                    const newSetting = Object.assign({}, setting);
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
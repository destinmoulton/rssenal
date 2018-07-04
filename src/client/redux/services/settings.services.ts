import * as Types from "../../types";

export function addSetting(
    settings: Types.TSettings,
    setting_key: string,
    setting_value: any
) {
    const setting = Object.assign({}, settings.get(setting_key));

    setting.value = setting_value;
    return settings.set(setting_key, setting);
}

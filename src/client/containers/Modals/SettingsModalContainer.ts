import { connect } from "react-redux";
import { settingChange } from "../../redux/actions/settings.actions";
import { feedsRefreshAll } from "../../redux/actions/feeds.actions";

import * as Types from "../../types";
import SettingsModalComponent, {
    ISettingsModalMapDispatch,
    ISettingsModalMapState
} from "../../components/Modals/SettingsModalComponent";

const mapStateToProps = (
    state: Types.IRootStoreState
): ISettingsModalMapState => {
    const { settingsStore } = state;
    return {
        settings: settingsStore.settings
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): ISettingsModalMapDispatch => {
    return {
        settingChange: (setting_key: string, setting_value: any) =>
            dispatch(settingChange(setting_key, setting_value)),
        feedsRefreshAll: () => dispatch(feedsRefreshAll())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsModalComponent);

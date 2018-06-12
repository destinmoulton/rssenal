import { connect } from "react-redux";
import { settingChange } from "../../redux/actions/settings.actions";
import { refreshAllFeeds } from "../../redux/actions/feeds.actions";

import * as Types from "../../interfaces";
import SettingsModalComponent from "../../components/Modals/SettingsModalComponent";

const mapStateToProps = (state: Types.IRootStoreState) => {
    const { settingsStore } = state;
    return {
        settings: settingsStore.settings
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch) => {
    return {
        settingChange: (setting_key: string, setting_value: any) =>
            dispatch(settingChange(setting_key, setting_value)),
        refreshAllFeeds: () => dispatch(refreshAllFeeds())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsModalComponent);

import { connect } from "react-redux";
import { changeSetting } from "../../redux/actions/settings.actions";
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
        changeSetting: (setting_key: string, setting_value: any) =>
            dispatch(changeSetting(setting_key, setting_value)),
        refreshAllFeeds: () => dispatch(refreshAllFeeds())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsModalComponent);

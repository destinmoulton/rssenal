import { connect } from "react-redux";
import { foldersGetAll } from "../../redux/actions/folders.actions";
import { feedsGetAll } from "../../redux/actions/feeds.actions";

import LeftPaneComponent, {
    ILeftPaneMapDispatch,
    ILeftPaneMapState
} from "../../components/LeftPane/LeftPaneComponent";

import * as Types from "../../types";

const mapStateToProps = (state: Types.IRootStoreState): ILeftPaneMapState => {
    const { foldersStore, feedsStore } = state;

    return {
        feeds: feedsStore.feeds,
        hasFolders: foldersStore.hasFolders,
        folders: foldersStore.folders
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): ILeftPaneMapDispatch => {
    return {
        foldersGetAll: () => dispatch(foldersGetAll()),
        feedsGetAll: async () => await dispatch(feedsGetAll())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftPaneComponent);

import { connect } from "react-redux";
import { getAllFolders } from "../../redux/actions/folders.actions";
import { getAllFeeds } from "../../redux/actions/feeds.actions";

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
        getAllFolders: () => dispatch(getAllFolders()),
        getAllFeeds: () => dispatch(getAllFeeds())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftPaneComponent);

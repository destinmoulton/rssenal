import { connect } from "react-redux";
import { getAllFolders } from "../../redux/actions/folders.actions";
import { getAllFeeds } from "../../redux/actions/feeds.actions";

import LeftMenuComponent, {
    ILeftMenuMapDispatch,
    ILeftMenuMapState
} from "../../components/LeftPane/LeftMenuComponent";

import * as Types from "../../interfaces";

const mapStateToProps = (state: Types.IRootStoreState): ILeftMenuMapState => {
    const { folders, feeds } = state;

    return {
        feeds: feeds.feeds,
        hasFolders: folders.hasFolders,
        folders: folders.folders
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): ILeftMenuMapDispatch => {
    return {
        getAllFolders: () => dispatch(getAllFolders()),
        getAllFeeds: () => dispatch(getAllFeeds())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftMenuComponent);

import { connect } from "react-redux";
import {
    beginDeleteFolder,
    beginSaveFolder
} from "../../redux/actions/folders.actions";
import { changeFilter } from "../../redux/actions/filter.actions";

import FolderItemComponent, {
    IFolderItemMapDispatch,
    IFolderItemMapState
} from "../../components/LeftPane/FolderItemComponent";

import * as Types from "../../types";

const mapStateToProps = (state: Types.IRootStoreState): IFolderItemMapState => {
    const { feedsStore, filterStore } = state;

    return {
        filter: filterStore.filter,
        unreadMapGroups: feedsStore.unreadMap.folders,
        feeds: feedsStore.feeds
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IFolderItemMapDispatch => {
    return {
        beginDeleteFolder: (folderId: Types.TFolderID) =>
            dispatch(beginDeleteFolder(folderId)),
        changeFilter: (newFilter: Types.IFilter) =>
            dispatch(changeFilter(newFilter))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FolderItemComponent);

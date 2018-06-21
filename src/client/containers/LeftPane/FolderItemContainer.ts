import { connect } from "react-redux";
import {
    folderInitiateDelete,
    folderInitiateSave
} from "../../redux/actions/folders.actions";
import { filterChangeActive } from "../../redux/actions/filter.actions";

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
        folderInitiateDelete: (folderId: Types.TFolderID) =>
            dispatch(folderInitiateDelete(folderId)),
        filterChangeActive: (newFilter: Types.IFilter) =>
            dispatch(filterChangeActive(newFilter))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FolderItemComponent);

import { connect } from "react-redux";
import { folderInitiateDelete } from "../../redux/actions/folders.actions";
import * as FilterActions from "../../redux/actions/filter.actions";

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
        filterChange: (newFilter: Types.IFilter) =>
            dispatch(FilterActions.filterChange(newFilter)),
        filterVisibleEntries: () =>
            dispatch(FilterActions.filterVisibleEntries())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FolderItemComponent);

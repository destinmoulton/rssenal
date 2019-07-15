import { connect } from "react-redux";
import * as EntryActions from "../../redux/actions/entries.actions";
import { folderDelete } from "../../redux/actions/folders.actions";
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
        entriesRemoveRead: () => dispatch(EntryActions.entriesRemoveRead()),
        folderDelete: (folderId: Types.TFolderID) =>
            dispatch(folderDelete(folderId)),
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

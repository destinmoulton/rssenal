import { connect } from "react-redux";
import {
    beginDeleteFolder,
    beginSaveFolder
} from "../../redux/actions/folders.actions";
import { changeFilter } from "../../redux/actions/filter.actions";

import FolderItemComponent, {
    IFolderItemMapDispatch,
    IFolderItemMapState
} from "../../components/LeftMenu/FolderItemComponent";

import * as Types from "../../interfaces";

const mapStateToProps = (state: Types.IRootStoreState): IFolderItemMapState => {
    const { feeds, filter } = state;

    return {
        filter: filter.filter,
        unreadMapGroups: feeds.unreadMap.folders,
        feeds: feeds.feeds
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

export default connect(mapStateToProps, mapDispatchToProps)(
    FolderItemComponent
);

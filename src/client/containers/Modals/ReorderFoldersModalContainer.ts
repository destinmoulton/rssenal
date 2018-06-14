import { connect } from "react-redux";
import { beginReorderFolders } from "../../redux/actions/folders.actions";

import * as Types from "../../types";
import ReorderFoldersModalComponent, {
    IReorderFolderMapDispatch,
    IReorderFoldersMapState
} from "../../components/Modals/ReorderFoldersModalComponent";

const mapStateToProps = (
    state: Types.IRootStoreState
): IReorderFoldersMapState => {
    const { foldersStore } = state;
    return {
        folders: foldersStore.folders
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IReorderFolderMapDispatch => {
    return {
        beginReorderFolders: (foldersArr: Types.IFolder[]) =>
            dispatch(beginReorderFolders(foldersArr))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReorderFoldersModalComponent);

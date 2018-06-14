import { connect } from "react-redux";
import { beginSaveFolder } from "../../redux/actions/folders.actions";

import * as Types from "../../types";
import EditFolderModalComponent, {
    IEditFolderModalMapDispatch
} from "../../components/Modals/EditFolderModalComponent";

const mapStateToProps = (state: Types.IRootStoreState) => {
    return {};
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IEditFolderModalMapDispatch => {
    return {
        beginSaveFolder: folderInfo => dispatch(beginSaveFolder(folderInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditFolderModalComponent);

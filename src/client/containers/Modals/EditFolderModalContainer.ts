import { connect } from "react-redux";
import { folderSave } from "../../redux/actions/folders.actions";

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
        folderSave: folderInfo => dispatch(folderSave(folderInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditFolderModalComponent);

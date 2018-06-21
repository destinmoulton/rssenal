import { connect } from "react-redux";
import { folderInitiateSave } from "../../redux/actions/folders.actions";

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
        folderInitiateSave: folderInfo =>
            dispatch(folderInitiateSave(folderInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditFolderModalComponent);

import { connect } from "react-redux";

import { saveFeed } from "../../redux/actions/feeds.actions";

import * as Types from "../../types";
import EditFeedModalComponent, {
    IEditFeedModalMapDispatch,
    IEditFeedModalMapState
} from "../../components/Modals/EditFeedModalComponent";

const mapStateToProps = (
    state: Types.IRootStoreState
): IEditFeedModalMapState => {
    const { foldersStore } = state;
    return {
        folders: foldersStore.folders
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IEditFeedModalMapDispatch => {
    return {
        saveFeed: feedInfo => dispatch(saveFeed(feedInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditFeedModalComponent);

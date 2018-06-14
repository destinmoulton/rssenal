import { connect } from "react-redux";

import { beginUpdateFeed } from "../../redux/actions/feeds.actions";

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
        beginUpdateFeed: feedInfo => dispatch(beginUpdateFeed(feedInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditFeedModalComponent);

import { connect } from "react-redux";

import * as Types from "../../types";
import { feedInitiateAdd } from "../../redux/actions/feeds.actions";
import AddFeedModalComponent, {
    IAddFeedModalMapDispatch,
    IAddFeedModalMapState
} from "../../components/Modals/AddFeedModalComponent";

const mapStateToProps = (
    state: Types.IRootStoreState
): IAddFeedModalMapState => {
    const { foldersStore } = state;
    return {
        folders: foldersStore.folders
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IAddFeedModalMapDispatch => {
    return {
        feedInitiateAdd: feedInfo => dispatch(feedInitiateAdd(feedInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddFeedModalComponent);

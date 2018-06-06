import { connect } from "react-redux";

import * as Types from "../../interfaces";
import { beginAddFeed } from "../../redux/actions/feeds.actions";
import AddFeedModalComponent, {
    IAddFeedModalMapDispatch,
    IAddFeedModalMapState
} from "../../components/Modals/AddFeedModalComponent";

const mapStateToProps = (
    state: Types.IRootStoreState
): IAddFeedModalMapState => {
    const { folders } = state;
    return {
        folders: folders.folders
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IAddFeedModalMapDispatch => {
    return {
        beginAddFeed: feedInfo => dispatch(beginAddFeed(feedInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddFeedModalComponent);

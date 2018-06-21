import { connect } from "react-redux";

import { feedsRefreshAll } from "../../redux/actions/feeds.actions";

import ButtonBarComponent, {
    IButtonBarMapDispatch,
    IButtonBarMapState
} from "../../components/LeftPane/ButtonBarComponent";

import * as Types from "../../types";

const mapStateToProps = (state: Types.IRootStoreState): IButtonBarMapState => {
    return {};
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IButtonBarMapDispatch => {
    return {
        feedsRefreshAll: () => dispatch(feedsRefreshAll())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonBarComponent);

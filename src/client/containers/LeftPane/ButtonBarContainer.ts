import { connect } from "react-redux";

import { refreshAllFeeds } from "../../redux/actions/feeds.actions";

import ButtonBarComponent, {
    IButtonBarMapDispatch,
    IButtonBarMapState
} from "../../components/LeftPane/ButtonBarComponent";

import * as Types from "../../interfaces";

const mapStateToProps = (state: Types.IRootStoreState): IButtonBarMapState => {
    return {};
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IButtonBarMapDispatch => {
    return {
        refreshAllFeeds: () => dispatch(refreshAllFeeds())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonBarComponent);

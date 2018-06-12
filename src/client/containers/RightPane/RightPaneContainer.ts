import { connect } from "react-redux";

import RightPaneComponent, {
    IRightPaneMapDispatch,
    IRightPaneMapState
} from "../../components/RightPane/RightPaneComponent";

import * as Types from "../../interfaces";

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IRightPaneMapDispatch => {
    return {};
};

const mapStateToProps = (state: Types.IRootStoreState): IRightPaneMapState => {
    const { filterStore } = state;
    return {
        filterTitle: filterStore.filterTitle
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RightPaneComponent);

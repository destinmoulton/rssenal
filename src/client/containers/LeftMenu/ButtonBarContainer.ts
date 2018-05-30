import { connect } from "react-redux";

import { refreshAllFeeds } from "../../redux/actions/feeds.actions";

import ButtonBarComponent, {
    IButtonBarComponentProps
} from "../../components/LeftMenu/ButtonBarComponent";

import * as Types from "../../interfaces";

const mapStateToProps = (state: Types.IRootStoreState) => {
    return {};
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IButtonBarComponentProps => {
    return {
        refreshAllFeeds: () => dispatch(refreshAllFeeds())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ButtonBarComponent);

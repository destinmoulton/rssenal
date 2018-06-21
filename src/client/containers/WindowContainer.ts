import { connect } from "react-redux";

import * as Types from "../types";

import WindowComponent, {
    IWindowComponentProps
} from "../components/WindowComponent";

import { authValidateToken } from "../redux/actions/auth.actions";

const mapStateToProps = (
    state: Types.IRootStoreState
): IWindowComponentProps => {
    return {
        isAuthorized: state.authStore.isAuthorized,
        isValidatingToken: state.authStore.isValidatingToken
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IWindowComponentProps => {
    return {
        authValidateToken: () => dispatch(authValidateToken())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WindowComponent);

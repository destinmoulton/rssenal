import { connect } from "react-redux";

import * as Types from "../interfaces";

import WindowComponent, {
    IWindowComponentProps
} from "../components/WindowComponent";

import { validateToken } from "../redux/actions/auth.actions";

const mapStateToProps = (
    state: Types.IRootStoreState
): IWindowComponentProps => {
    return {
        isAuthorized: state.auth.isAuthorized,
        isValidatingToken: state.auth.isValidatingToken
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): IWindowComponentProps => {
    return {
        validateToken: () => dispatch(validateToken())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowComponent);

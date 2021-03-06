import { connect } from "react-redux";

import { authLogoutUser } from "../../redux/actions/auth.actions";

import LogoutButtonComponent, {
    ILogoutButtonComponentProps
} from "../../components/LeftPane/LogoutButtonComponent";

import * as Types from "../../types";

const mapStateToProps = (
    state: Types.IRootStoreState
): ILogoutButtonComponentProps => {
    return {};
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): ILogoutButtonComponentProps => {
    return {
        authLogoutUser: () => dispatch(authLogoutUser())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutButtonComponent);

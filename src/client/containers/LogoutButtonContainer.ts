import { connect } from "react-redux";

import { logoutUser } from "../redux/actions/auth.actions";

import LogoutButtonComponent, {
    ILogoutButtonComponentProps
} from "../components/LeftMenu/LogoutButtonComponent";

import * as Types from "../interfaces";

const mapStateToProps = (
    state: Types.IRootStoreState
): ILogoutButtonComponentProps => {
    return {};
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): ILogoutButtonComponentProps => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(
    LogoutButtonComponent
);

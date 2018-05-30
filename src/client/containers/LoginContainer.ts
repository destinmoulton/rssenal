import { connect } from "react-redux";

import LoginComponent, {
    ILoginComponentProps
} from "../components/LoginComponent";

import { loginUser } from "../redux/actions/auth.actions";

import * as Types from "../interfaces";

const mapStateToProps = (
    state: Types.IRootStoreState
): ILoginComponentProps => {
    return {
        authenticationError: state.auth.authenticationError
    };
};

const mapDispatchToProps = (
    dispatch: Types.IDispatch
): ILoginComponentProps => {
    return {
        loginUser: (username: string, password: string) => {
            return dispatch(loginUser(username, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

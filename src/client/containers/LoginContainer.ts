import { connect } from "react-redux";

import LoginComponent, {
    ILoginMapDispatch,
    ILoginMapState
} from "../components/LoginComponent";

import { authLoginUser } from "../redux/actions/auth.actions";

import * as Types from "../types";

const mapStateToProps = (state: Types.IRootStoreState): ILoginMapState => {
    return {
        authenticationError: state.authStore.authenticationError
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch): ILoginMapDispatch => {
    return {
        authLoginUser: (username: string, password: string) => {
            return dispatch(authLoginUser(username, password));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);

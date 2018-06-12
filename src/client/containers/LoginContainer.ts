import { connect } from "react-redux";

import LoginComponent, {
    ILoginMapDispatch,
    ILoginMapState
} from "../components/LoginComponent";

import { loginUser } from "../redux/actions/auth.actions";

import * as Types from "../interfaces";

const mapStateToProps = (state: Types.IRootStoreState): ILoginMapState => {
    return {
        authenticationError: state.authStore.authenticationError
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch): ILoginMapDispatch => {
    return {
        loginUser: (username: string, password: string) => {
            return dispatch(loginUser(username, password));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);

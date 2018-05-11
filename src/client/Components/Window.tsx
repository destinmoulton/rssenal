import * as React from "react";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";

import Browser from "./Browser";
import ErrorBoundary from "./ErrorBoundary";
import Login from "./Login";

import { IDispatch, IRootStoreState } from "../interfaces";

import { validateToken } from "../redux/actions/auth.actions";

interface IWindowMapStateToProps {
    isAuthorized: boolean;
    isValidatingToken: boolean;
}

interface IWindowMapDispatchToProps {
    validateToken: () => void;
}

interface IWindow extends IWindowMapStateToProps, IWindowMapDispatchToProps {}

class Window extends React.Component<IWindow> {
    constructor(props: IWindow) {
        super(props);
    }

    componentWillMount() {
        if (localStorage.getItem("jwt_token")) {
            this.props.validateToken();
        }
    }

    render() {
        const { isAuthorized, isValidatingToken } = this.props;

        let display = null;
        if (isAuthorized) {
            display = <Browser />;
        } else if (isValidatingToken) {
            display = <Loader />;
        } else {
            display = <Login />;
        }

        return <ErrorBoundary>{display}</ErrorBoundary>;
    }
}

const mapStateToProps = (state: IRootStoreState): IWindowMapStateToProps => {
    return {
        isAuthorized: state.auth.isAuthorized,
        isValidatingToken: state.auth.isValidatingToken
    };
};

const mapDispatchToProps = (dispatch: IDispatch): IWindowMapDispatchToProps => {
    return {
        validateToken: () => dispatch(validateToken())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Window);

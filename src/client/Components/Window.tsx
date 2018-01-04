import * as React from "react";
import { connect } from "react-redux";

import Browser from "./Browser";
import Login from "./Login";

import { IDispatch, IRootStoreState } from "../interfaces";

import { validateToken } from "../redux/actions/auth.actions";

interface IWindowMapStateToProps {
    isAuthorized: boolean;
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
        const { isAuthorized } = this.props;

        let display = isAuthorized ? <Browser /> : <Login />;

        return display;
    }
}

const mapStateToProps = (state: IRootStoreState): IWindowMapStateToProps => {
    return {
        isAuthorized: state.auth.isAuthorized
    };
};

const mapDispatchToProps = (dispatch: IDispatch): IWindowMapDispatchToProps => {
    return {
        validateToken: () => dispatch(validateToken())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Window);

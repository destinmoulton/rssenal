import * as React from "react";
import { connect } from "react-redux";

import Browser from "./Browser";
import Login from "./Login";

import { IDispatch, IRootStoreState } from "../interfaces";

interface IWindowMapStateToProps {
    isAuthorized: boolean;
}

interface IWindow extends IWindowMapStateToProps {}

class Window extends React.Component<IWindow> {
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

const mapDispatchToProps = (dispatch: IDispatch) => {
    return {};
};

export default connect(mapStateToProps)(Window);

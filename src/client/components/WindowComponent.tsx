import * as React from "react";

import { Loader } from "semantic-ui-react";

import Browser from "./Browser";
import ErrorBoundary from "./ErrorBoundary";
import LoginContainer from "../containers/LoginContainer";

export interface IWindowComponentProps {
    isAuthorized?: boolean;
    isValidatingToken?: boolean;
    validateToken?: () => void;
}

class WindowComponent extends React.Component<IWindowComponentProps> {
    componentDidMount() {
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
            display = <LoginContainer />;
        }

        return <ErrorBoundary>{display}</ErrorBoundary>;
    }
}

export default WindowComponent;

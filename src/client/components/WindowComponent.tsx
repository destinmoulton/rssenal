import debug from "debug";
import * as React from "react";

import { Loader } from "semantic-ui-react";

import storage from "../lib/storage";
import Browser from "./Browser";
import ErrorBoundary from "./ErrorBoundary";
import LoginContainer from "../containers/LoginContainer";

const log = debug("rssenal:WindowComponent");

export interface IWindowComponentProps {
    isAuthorized?: boolean;
    isValidatingToken?: boolean;
    authValidateToken?: () => void;
}

class WindowComponent extends React.Component<IWindowComponentProps> {
    componentDidMount() {
        if (storage.get("jwt_token")) {
            this.props.authValidateToken();
        }
    }

    render() {
        log("render()");
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

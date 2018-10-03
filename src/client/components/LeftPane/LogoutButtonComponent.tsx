import debug from "debug";
import * as React from "react";

import { Button, Popup } from "semantic-ui-react";

const log = debug("rssenal:LogoutButtonComponent");

export interface ILogoutButtonComponentProps {
    authLogoutUser?: () => void;
}

class LogoutButtonComponent extends React.Component<
    ILogoutButtonComponentProps
> {
    _handleClickLogout = () => {
        log("_handleClickLogout()");
        this.props.authLogoutUser();
    };

    render() {
        log("render()");
        return (
            <Popup
                trigger={
                    <Button
                        className="rss-leftmenu-button-logout"
                        icon="sign out"
                        onClick={this._handleClickLogout}
                        size="mini"
                        floated="right"
                    />
                }
                content="Logout"
            />
        );
    }
}

export default LogoutButtonComponent;

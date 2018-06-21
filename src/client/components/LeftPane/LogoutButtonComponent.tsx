import * as React from "react";

import { Button, Popup } from "semantic-ui-react";

export interface ILogoutButtonComponentProps {
    authLogoutUser?: () => void;
}

class LogoutButtonComponent extends React.Component<
    ILogoutButtonComponentProps
> {
    _handleClickLogout = () => {
        this.props.authLogoutUser();
    };

    render() {
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

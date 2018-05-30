import * as React from "react";

import { Button, Popup } from "semantic-ui-react";

export interface ILogoutButtonComponentProps {
    logoutUser?: () => void;
}

class LogoutButtonComponent extends React.Component<
    ILogoutButtonComponentProps
> {
    constructor(props: ILogoutButtonComponentProps) {
        super(props);

        this._handleClickLogout = this._handleClickLogout.bind(this);
    }

    _handleClickLogout() {
        this.props.logoutUser();
    }

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

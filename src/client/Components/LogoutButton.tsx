import * as React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import { logoutUser } from "../redux/actions/auth.actions";
import { IRootStoreState, IDispatch } from "../interfaces";
interface IMapStateToProps {}
interface IMapDispatchToProps {
    logoutUser: () => void;
}
interface ILogoutProps extends IMapStateToProps, IMapDispatchToProps {}
class LogoutButton extends React.Component<ILogoutProps> {
    constructor(props: ILogoutProps) {
        super(props);

        this._handleClickLogout = this._handleClickLogout.bind(this);
    }

    _handleClickLogout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <Button
                className="rss-leftmenu-button-logout"
                icon="sign out"
                onClick={this._handleClickLogout}
                size="mini"
            />
        );
    }
}

const mapStateToProps = (state: IRootStoreState) => {
    return {};
};

const mapDispatchToProps = (dispatch: IDispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);

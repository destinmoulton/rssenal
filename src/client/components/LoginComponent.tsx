import debug from "debug";
import * as React from "react";

import {
    Button,
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Segment
} from "semantic-ui-react";

const log = debug("rssenal:LoginComponent");

export interface ILoginMapState {
    authenticationError: string;
}

export interface ILoginMapDispatch {
    authLoginUser: (username: string, password: string) => void;
}

type TAllProps = ILoginMapDispatch & ILoginMapState;

interface ILoginState {
    username?: string;
    password?: string;
}

class LoginComponent extends React.Component<TAllProps, ILoginState> {
    state = {
        username: "",
        password: ""
    };

    _changeInput = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value.trim() });
    };

    _authenticateUser = () => {
        log("_authenticateUser()");
        const { username, password } = this.state;

        if (username && password) {
            this.props.authLoginUser(username, password);
        }
    };

    render() {
        log("render()");
        const { authenticationError } = this.props;

        let message = null;
        if (authenticationError !== "") {
            message = (
                <Message negative>
                    <p>{authenticationError}</p>
                </Message>
            );
        }
        return (
            <div className="login-form">
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                <Grid
                    textAlign="center"
                    style={{ height: "100%" }}
                    verticalAlign="middle"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" className="rss-login-header">
                            <Icon name="rss" />
                            &nbsp;&nbsp;RSSenal
                        </Header>
                        <Form size="large">
                            <Segment>
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Username"
                                    name="username"
                                    onChange={this._changeInput}
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    onChange={this._changeInput}
                                />
                                {message}
                                <Button
                                    className="rss-login-button"
                                    fluid
                                    size="large"
                                    onClick={this._authenticateUser}
                                >
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default LoginComponent;

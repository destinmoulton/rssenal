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

export interface ILoginMapState {
    authenticationError: string;
}

export interface ILoginMapDispatch {
    loginUser: (username: string, password: string) => void;
}

type TAllProps = ILoginMapDispatch & ILoginMapState;

class LoginComponent extends React.Component<TAllProps> {
    state = {
        username: "",
        password: ""
    };

    constructor(props: TAllProps) {
        super(props);

        this._authenticateUser = this._authenticateUser.bind(this);
        this._changeInput = this._changeInput.bind(this);
    }

    _changeInput(e: any) {
        this.setState({ [e.target.name]: e.target.value.trim() });
    }

    _authenticateUser() {
        const { username, password } = this.state;

        if (username && password) {
            this.props.loginUser(username, password);
        }
    }
    render() {
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
                            <Icon name="rss" />&nbsp;&nbsp;RSSenal
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

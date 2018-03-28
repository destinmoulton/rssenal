import * as React from "react";
import { connect } from "react-redux";
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment
} from "semantic-ui-react";

import { loginUser } from "../redux/actions/auth.actions";

import { IDispatch, IRootStoreState } from "../interfaces";

interface IMapStateToProps {
    authenticationError: string;
}
interface IMapDispatchToProps {
    loginUser: (username: string, password: string) => void;
}

interface ILoginProps extends IMapStateToProps, IMapDispatchToProps {}

class Login extends React.Component<ILoginProps> {
    state = {
        username: "",
        password: ""
    };

    constructor(props: ILoginProps) {
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
                            RSSenal Sign In
                        </Header>
                        <Form size="large">
                            <Segment stacked>
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
                                    color="teal"
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
const mapStateToProps = (state: IRootStoreState): IMapStateToProps => {
    return {
        authenticationError: state.auth.authenticationError
    };
};

const mapDispatchToProps = (dispatch: IDispatch): IMapDispatchToProps => {
    return {
        loginUser: (username: string, password: string) => {
            return dispatch(loginUser(username, password));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

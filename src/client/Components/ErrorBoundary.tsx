import * as React from "react";
import { connect } from "react-redux";

import { message } from "../redux/actions/messages.actions";
import * as Types from "../interfaces";

interface IErrorBoundaryState {
    hasError: boolean;
}

interface IErrorBoundaryProps {
    dispatch: Types.IDispatch;
}

class ErrorBoundary extends React.Component<
    IErrorBoundaryProps,
    IErrorBoundaryState
> {
    constructor(props: IErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: true
        };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({ hasError: true });

        this.props.dispatch(message(error.message, "error"));
    }

    render() {
        if (this.state.hasError) {
            return <div>An Error Has Been Enountered.</div>;
        }
        return this.props.children;
    }
}

export default connect()(ErrorBoundary);

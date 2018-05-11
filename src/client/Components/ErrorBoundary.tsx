import * as React from "react";

import * as Types from "../interfaces";

interface IErrorBoundaryState {
    hasError: boolean;
    error: Error;
    errorInfo: React.ErrorInfo;
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
            hasError: false,
            error: Error(),
            errorInfo: { componentStack: "" }
        };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo: info
        });
    }

    render() {
        if (this.state.hasError) {
            return <div>An Error Has Been Enountered.</div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

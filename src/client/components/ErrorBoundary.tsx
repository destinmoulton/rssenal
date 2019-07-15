import debug from "debug";

import * as React from "react";

const log = debug("rssenal:ErrorBoundary");

interface IErrorBoundaryState {
    hasError: boolean;
    error: Error;
    errorInfo: React.ErrorInfo;
}

interface IErrorBoundaryProps {}

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
        log("componentDidCatch()", error, info);
        this.setState({
            hasError: true,
            error,
            errorInfo: info
        });
    }

    render() {
        log("render()");
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Error</h2>
                    <h3>An Error Has Been Encountered.</h3>
                    <p>{this.state.error.message}</p>
                    <p>{this.state.errorInfo.componentStack}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

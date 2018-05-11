import * as React from "react";

interface IErrorBoundaryState {
    hasError: boolean;
}
interface IErrorBoundaryProps {}
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
    }

    render() {
        if (this.state.hasError) {
            return <div>An Error Has Been Enountered.</div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

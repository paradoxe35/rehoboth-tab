//@ts-check
import React from 'react'

class ErrorBoundaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {

        if (this.state.hasError) {
            return <div>{this.props.message || 'Erreur'}</div>;
        }
        return this.props.children;
    }
}


const ErrorBoundary = ({ children, message = null }) => {
    // @ts-ignore
    return <ErrorBoundaryComponent message={message}>
        {children}
    </ErrorBoundaryComponent>
}

export default ErrorBoundary
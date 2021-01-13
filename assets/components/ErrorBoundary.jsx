//@ts-check
import React from 'react'
import { withTranslation } from 'react-i18next';

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
        const { t } = this.props;

        if (this.state.hasError) {
            return <div>{this.props.message || t('Erreur')}</div>;
        }
        return this.props.children;
    }
}

const NewErrorBoundaryComponent = withTranslation()(ErrorBoundaryComponent)

const ErrorBoundary = ({ children, message = null }) => {
    // @ts-ignore
    return <NewErrorBoundaryComponent message={message}>
        {children}
    </NewErrorBoundaryComponent>
}

export default ErrorBoundary
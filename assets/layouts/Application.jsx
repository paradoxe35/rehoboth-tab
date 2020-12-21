import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";


const Application = ({ children }) => {
    return <ErrorBoundary>
        {children}
    </ErrorBoundary>
}

export default Application;
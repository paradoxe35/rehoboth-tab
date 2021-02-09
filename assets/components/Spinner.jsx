import React from 'react'

const Spinner = ({ sm = undefined, className = null }) => {
    return <div className={`d-flex justify-content-center align-items-center ${className}`} >
        <div className={`spinner-border ${sm ? `spinner-border-${sm}` : ''}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
}


export default Spinner

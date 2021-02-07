import React from 'react'

const Spinner = ({ sm = undefined }) => {
    return <div className="d-flex justify-content-center" >
        <div className={`spinner-border ${sm ? `spinner-border-${sm}` : ''}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
}


export default Spinner

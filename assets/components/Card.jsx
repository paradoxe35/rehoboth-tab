import React from 'react'

const Card = ({ cardClass = '', bodyClass = "", children, border = false, className = '', title = null }) => {
    return <div className={`card ${!border ? 'border-0' : ''} ${cardClass} ${className}`} >
        {title && <div className="card-header">{title}</div>}
        <div className={`card-body ${bodyClass}`}>
            {children}
        </div>
    </div>
}

export default Card
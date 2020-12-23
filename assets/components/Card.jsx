import React from 'react'

const Card = ({ cardClass = '', bodyClass = "", children, border = false, className = '' }) => {
    return <div className={`card ${!border ? 'border-0' : ''} ${cardClass} ${className}`} >
        <div className={`card-body ${bodyClass}`}>
            {children}
        </div>
    </div>
}




export default Card
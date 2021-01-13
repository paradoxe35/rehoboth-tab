import React from 'react'

const Button = ({
    color = 'primary',
    text = '',
    className = '',
    type = 'button',
    loading = false,
    onClick = null
}) => {
    // @ts-ignore
    return <button onClick={onClick} className={`btn btn-${color} ${className} text-white`} type={type} >
        <div className="d-flex align-content-center align-items-center">
            <span>{text}</span>
            {loading && (
                <>
                    <span className="mx-1"></span>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="visually-hidden" >Chargement...</span>
                </>
            )}
        </div>
    </button>
}

export default Button
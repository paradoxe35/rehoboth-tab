import React from 'react'

const Button = ({
    color = 'primary',
    text = null,
    className = '',
    type = 'button',
    loading = false,
    onClick = undefined
}) => {
    // @ts-ignore
    return <button onClick={onClick} disabled={loading} className={`btn btn-${color} ${className} text-white`} type={type} >
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
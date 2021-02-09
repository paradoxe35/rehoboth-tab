import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


const FormLabel = styled.label`
    letter-spacing: 1px;
`

const FormTextControl = ({ label, type = 'text', name, textarea = false, errors = {} }) => {
    const [error, setError] = useState(null)

    useEffect(() => {
        if (name in errors) {
            setError(errors[name])
        }
    }, [errors])

    const onKeyUp = () => setError(null)

    return <div className="mb-3">
        <FormLabel htmlFor={`${name}-1`} className="form-label text-xs text-muted">
            {label}
        </FormLabel>
        {
            textarea ?
                <textarea onKeyUp={onKeyUp} required name={name} className={`form-control ${error ? 'is-invalid' : ''} border-radius-0`} id={`${name}-1`} rows={5}></textarea> :
                <input onKeyUp={onKeyUp} type={type} required name={name} className={`form-control ${error ? 'is-invalid' : ''} border-radius-0`} id={`${name}-1`} />
        }
        {
            error && (
                <div className="invalid-feedback text-xs">
                    {error}
                </div>
            )
        }
    </div>
}

export default FormTextControl
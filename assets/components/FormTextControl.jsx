import React from 'react'
import styled from 'styled-components'
import { useErrorInput } from '../utils/hooks'


const FormLabel = styled.label`
    letter-spacing: 1px;
`

const FormTextControl = ({ label, type = 'text', name, textarea = false, errors = {} }) => {
    const { error, onKeyUp } = useErrorInput(name, errors)

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
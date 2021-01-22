import React, { forwardRef } from "react"


/**
 * @type { JSX.Element | any }
 */
export const FormControl = forwardRef(/** @param {*} param0  */
    ({
        label = '',
        type = "text",
        defaultValue = null,
        value = null,
        onChange = null,
        name = null,
        placeholder = null
    }, ref) => {

        const id = Math.random()

        return <div className="mb-3">
            <label htmlFor={`input-${id}`} className="form-label">{label}</label>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                name={name}
                placeholder={placeholder}
                className="form-control text-xs"
                id={`input-${id}`} />
        </div>
    })

/**
 * @type { any }
 */
// @ts-ignore
export const Checkbox = forwardRef(({ defaultChecked = null, label = '', checked = null, onChange = null, name = null }, ref) => {
    const id = Math.random()

    return <div className="form-check my-3">
        <input
            className="form-check-input"
            id={`checkbox-${id}`}
            type="checkbox"
            name={name}
            ref={ref}
            defaultChecked={defaultChecked}
            onChange={onChange}
            checked={checked} />
        <label className="form-check-label" htmlFor={`checkbox-${id}`}>
            {label}
        </label>
    </div>
})
import React, { useReducer, useRef } from 'react'
import styled from 'styled-components'
import { ApiRequestAxios } from '/@/api/axios'


const SubscribeFormStyled = styled.div`
    margin: 0;
    padding: 0;
    position: relative;
`

const FormGroup = styled.form`
    width: 100%;
`

const InputParentText = styled.div`
    padding-right: 0;
`

const InputParentSubmit = styled.div`
   padding-left: 0;
`

const InputText = styled.input`
    border-radius: 0px;
    &:focus{
        box-shadow: none;
    }
`
const Inputubmit = styled.button`
    border-radius: 0px;
`

const reducer = (_, action) => {
    switch (action?.type) {
        case 'loading': return { type: 'loading', value: action?.value }
        case 'error': return { type: 'error', value: action?.value }
        case 'success': return { type: 'success', value: action?.value }
        default: return {};
    }
}

const GetNotifiedForm = () => {
    const [state, dispatch] = useReducer(reducer, {})
    const emailRef = useRef(null)

    const reset = () => {
        window.setTimeout(() => {
            // @ts-ignore
            dispatch({})
            emailRef.current && (emailRef.current.value = '')
        }, 5000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // @ts-ignore
        dispatch({ type: 'loading' });

        ApiRequestAxios(route('guest.subscribe'), 'post', new FormData(e.target))
            .then(({ data }) => {
                // @ts-ignore
                dispatch({ type: 'success', value: data?.message });
                reset()
            })
            .catch((error) => {
                // @ts-ignore
                dispatch({ type: 'error', value: error?.errors?.email[0] });
                reset()
            })
    }

    return <SubscribeFormStyled>
        <FormGroup noValidate={true} autoComplete="off" className="row g-3" onSubmit={handleSubmit}>
            <InputParentText className="col">
                <InputText
                    type="email"
                    // @ts-ignore
                    ref={emailRef}
                    name="email"
                    className="form-control"
                    placeholder={"Adresse e-mail"} />
            </InputParentText>
            <InputParentSubmit className="col mb-3">
                <Inputubmit type="submit" disabled={state.type == 'loading'} className="btn btn-primary text-white ">
                    Souscrire
                </Inputubmit>
            </InputParentSubmit>
        </FormGroup>
        {
            state.type == 'loading' &&
            <div className="text-muted text-xs">
                <b>Soumission en cours...</b>
            </div>
        }
        {
            ['error', 'success'].includes(state.type) &&
            <div className={`${state.type == 'success' ? 'text-success' : 'text-danger'} text-xs`}>
                <b>{state.value}</b>
            </div>
        }
    </SubscribeFormStyled>
}


export default GetNotifiedForm
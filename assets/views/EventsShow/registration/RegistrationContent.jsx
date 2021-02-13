import React, { useState } from 'react'
import styled from 'styled-components'
import { ApiRequestAxios } from '/@/api/axios'
import Button from '/@/components/admin/Button'
import Label from '/@/components/Label'
import { capitalize } from '/@/functions/functions'
import { useErrorInput, useFormValidator } from '/@/utils/hooks'


const CompositionSource = styled.div`
    position: fixed;
    color: var(--bs-dark);
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 3001;
    display: none;
    text-align: left;
    box-sizing: border-box;
    overflow-y: scroll;
    padding-left: 50%;
    padding-right: 0px;
    @media (max-width: 480px) {
        &{
            -webkit-overflow-scrolling: touch;
        }
    }
    @media (max-width: 992px) {
        &{
            padding-left: 0;
            padding-top: 500px;
            margin-top: 0;
        }
    }
    @media (max-height: 570px) and (max-width: 992px) {
        &{
            padding-top: 430px;
        }
    }
`

const CompositionSourceContainer = styled.div`
    background-color: var(--bs-light);
    transform-origin: 100% 0;
    padding-bottom: 20px;
    overflow-x: hidden;
    padding-bottom: 20px;
    overflow-x: hidden;
    padding-top: 50px;
    min-height: 100vh;
    @media (max-width: 992px) {
        & {
            padding-top: 0;
            margin-top: 0;
        }
    }
    @media (max-width: 480px) {
        & {
            padding-top: 20px;
        }
    }
`

const FormInput = styled.input`
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1rem;
    color: #444546;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    &::placeholder {
        color: transparent;
    }
    &:placeholder-shown ~ .form__label {
        font-size: 1rem;
        cursor: text;
        top: 20px;
    }
    &.is-invalid {
        border-bottom: 2px solid #dc3545;
    }

    &:focus {
        ~ .form__label {
            position: absolute;
            top: 0;
            display: block;
            transition: 0.2s;
            font-size: 1rem;
            color: var(--bs-primary);
            font-weight:700;    
        }
        padding-bottom: 6px;  
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(to right, var(--bs-primary), var(--bs-secondary));
        border-image-slice: 1;
    }

    &:required,&:invalid { box-shadow:none; }
`

const FormGroup = styled.div`
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 70%;
`

const FormLabel = styled.label`
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #9b9b9b;
`
const TicketWrapper = styled.div`
    .btn-check:checked + .btn-outline-secondary {
        color: var(--bs-light);
    }

    .btn-check:hover + .btn-outline-secondary {
        color: var(--bs-light);
    }
`

const BeautyInput = ({ label, type = 'text', name, errors = {}, autoFocus = false }) => {
    const { error, onKeyUp } = useErrorInput(name, errors)

    return <FormGroup className="composition-source-text mb-3">
        <FormInput type={type} onKeyUp={onKeyUp} className={error ? 'is-invalid' : ''} placeholder={label} name={name} autoFocus={autoFocus} id={name} />
        {
            error && (
                <div className="invalid-feedback text-xs">
                    {error}
                </div>
            )
        }
        <FormLabel htmlFor={name} className="form__label">{label}</FormLabel>
    </FormGroup>
}

const Option = ({ ticket, selected, setSelected }) => {
    const name = `${Math.random()}-${ticket.name.split(' ').join('-')}`
    return <>
        <input
            onClick={() => setSelected(ticket)}
            type="radio"
            className="btn-check"
            name="btn-tickets"
            id={name}
            autoComplete="off"
            checked={ticket.id == selected.id} />
        <label className="btn btn-outline-secondary" htmlFor={name}>{capitalize(ticket.name)} - ${ticket.price}</label>
    </>
}

const PricesOptions = ({ tickets, selected, setSelected }) => {
    return <TicketWrapper className="btn-group composition-source-text" role="group">
        {tickets.map(ticket => <Option key={ticket.id} ticket={ticket} setSelected={setSelected} selected={selected} />)}
    </TicketWrapper>
}

const Content = ({ event }) => {
    const { errors, setErrors, setLoading, loading, success, setSuccess } = useFormValidator()
    const [tickets, setTickets] = useState(event.ticket.options)
    const [selected, setSelected] = useState(tickets.find(o => o.default))

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selected && !selected.reste) return
        setLoading(true)

        const form = new FormData(e.target)

        selected?.id && form.set('ticket_option_id', selected?.id)

        ApiRequestAxios(route('guest.events.registrations', { event: event.id }), 'post', form)
            .then(({ data: { message, tickets, reg_id } }) => {
                setSuccess({ message, reg_id })
                setTickets(tickets)
            })
            .catch((error) => {
                if (error?.errors) {
                    setErrors(error.errors || {})
                }
            })
            .finally(() => setLoading(false))
    }

    return <>
        <h1 className="composition-source-text font-weight-700 mt-3 mb-5 px-3">S'incrire</h1>
        {!!tickets.length && !success && (
            <div className="p-4 bg-white composition-source-text">
                <PricesOptions tickets={tickets} selected={selected} setSelected={setSelected} />
                <div className="mt-3 text-muted text-sm composition-source-text">
                    Billets disponibles ({selected.name}): {selected.reste}
                </div>
            </div>
        )}
        {
            success && (
                <div className="p-4 bg-white composition-source-text">
                    <p className="text-primary composition-source-text text-sm mb-2">
                        {success.message}.
                    </p>
                    <p className="text-muted composition-source-text text-sm mb-2">
                        Votre clé d'autorisation: <b>{success.reg_id}</b>.
                    </p>
                    <p className="text-muted composition-source-text text-xs mb-2">
                        <em>Veuillez garder la clé ci-dessus en sécurité</em>
                    </p>
                    <hr className="composition-source-text" />
                    {selected && (
                        <div className="composition-source-text">
                            <Label>
                                <span>Pour plus d'informations sur l'achat de billets ou autres choses, </span>
                                <span>veuillez contacter l'organisateur de l'événement.</span>
                            </Label>
                        </div>
                    )}
                    {(event.organizer.email || event.organizer.phone) && (
                        <div className="text-sm text-muted">
                            <p className="mb-3 composition-source-text">Organisateur: </p>
                            <div className="mx-3">
                                {event.organizer.name && <p className="mb-2 composition-source-text">Nom: {event.organizer.name}</p>}
                                {event.organizer.email && <p className="mb-2 composition-source-text">Email: {event.organizer.email}</p>}
                                {event.organizer.phone && <p className="mb-2 composition-source-text">Phone: {event.organizer.phone}</p>}
                            </div>
                        </div>
                    )}
                </div>
            )
        }
        {
            !success && (
                <form autoComplete="off" className="px-3" onSubmit={handleSubmit}>
                    <BeautyInput errors={errors} label="Votre Nom" autoFocus={true} name="name" />
                    <BeautyInput errors={errors} label="Votre Email" name="email" />
                    <BeautyInput errors={errors} label="Téléphone" name="phone" />
                    <Button
                        type="submit"
                        text="Inscription"
                        disabled={selected && !selected.reste}
                        loading={loading}
                        className="mt-4 composition-source-text" />
                </form>
            )
        }
    </>
}

const RegistrationContent = ({ event, backButton }) => {

    return <div className="row">
        <div className="col-lg-6 vh-100 px-lg-5">
            <div className="d-flex h-75 align-items-center justify-content-center">
                <h1 className="ml3">{event.name}</h1>
            </div>
        </div>
        <CompositionSource className="col-lg-6 composition-source pr-0" style={{ display: "block" }}>
            {backButton}
            <CompositionSourceContainer className="composition-source-container" style={{ transform: "scaleX(1)", display: "block" }}>
                <Content event={event} />
            </CompositionSourceContainer>
        </CompositionSource>
    </div>
}


export default RegistrationContent
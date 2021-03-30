import React, { lazy, Suspense } from 'react';
import CountdownRender, { useCountdownDone } from '/@/views/CountdownRender';
import styled from 'styled-components';
import { CountdownParentStyled, CountdownRowStyled } from '/@/components/StyledComponents';
import Spinner from '/@/components/Spinner';
import OpenShareButton from '/@/components/OpenShareButton';

const ShareButton = styled.div`
    @media (max-width: 767px) {
        & {
            text-align: center !important;
        }
    }
`

const ticketOptions = (options = []) => {
    const prices = options.sort((a, b) => a.price - b.price)

    if (options.length <= 1) {
        return `$${prices[0]?.price}`
    } else {
        return `$${prices[0]?.price} - $${prices[options.length - 1]?.price}`
    }
}

const TicketStatus = ({ ticket }) => {
    return <div className="text-center mx-3 mt-2 text-sm">
        Ticket: {ticket.type == 'free' ? <span className="text-success">Gratuit</span> : (
            <span className="text-muted font-weight-semi-bold">
                {ticketOptions(ticket.options)}
            </span>
        )}
    </div>
}

const Register = lazy(() => import(/* webpackChunkName: "registration-event" */'./registration/RegistrationEvent'))

const CountDownEvent = ({ event }) => {
    const { isReady, handleComplete } = useCountdownDone(event?.ready)
    return <div className="container-fluid">
        <CountdownParentStyled>
            <div className="container">
                <CountdownRowStyled className="row  justify-content-center">
                    <div className="h-25 w-10" />
                    <ShareButton className="col-md-6 h-100 my-3 mt-lg-0">
                        <div className="d-inline-block mt-3">
                            <div className="mx-3 d-inline-block">
                                <OpenShareButton title="Événement" text={event.name} />
                            </div>
                            {event?.enable_registration && (
                                <div className="d-inline-block">
                                    <Suspense fallback={<Spinner sm='sm' />}>
                                        <Register event={event} />
                                    </Suspense>
                                </div>
                            )}
                            <TicketStatus ticket={event.ticket} />
                        </div>

                    </ShareButton>
                    <div className="col-md-5 my-3">
                        <CountdownRender isReady={isReady} handleComplete={handleComplete} date={event.start_datetime} />
                    </div>
                </CountdownRowStyled>
            </div>
        </CountdownParentStyled>
    </div>
}


export default CountDownEvent
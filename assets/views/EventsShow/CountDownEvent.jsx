import React from 'react';
import CountdownRender, { useCountdownDone } from '/@/views/CountdownRender';
import { FiShare2 } from 'react-icons/fi'
import styled from 'styled-components';
import { CountdownParentStyled, CountdownRowStyled } from '/@/components/StyledComponents';



const ShareButton = styled.div`
    @media (max-width: 576px) {
        & {
            text-align: center !important;
        }
    }
`

const CountDownEvent = ({ event }) => {
    const { isReady, handleComplete } = useCountdownDone(event?.ready)
    return <div className="container-fluid">
        <CountdownParentStyled>
            <div className="container">
                <CountdownRowStyled className="row align-items-center justify-content-center">
                    <ShareButton className="col-md-6 h-100 my-3 mt-lg-0">
                        <button type="button" className="mx-3 btn btn-dark text-sm btn-sm">
                            <FiShare2 />{" "}
                            <span>Partager</span>
                        </button>
                        {event?.enable_registration && (
                            <button type="button" className="btn btn-primary text-sm btn-sm text-white">
                                <span>S'inscrire</span>
                            </button>
                        )}
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
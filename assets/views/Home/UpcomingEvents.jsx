import React from 'react'
import styled from 'styled-components'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import SubtitleLead from '/@/components/SubtitleLead'
import {
    LatestSectioCardItemStyled,
    LatestSectionH3Styled,
    LatestSectionItemData,
    LatestSectionItemLabel,
    LatestSectionParentStyled,
    LatestSectionSpanStyled
} from './components/LatestSectionCard';
import H5TitleLink from '/@/components/H5TitleLink';
import ImageThumbnail from '/@/components/ImageThumbnail';
import { letterLimit } from '/@/functions/functions';
import CountdownRender, { useCountdownDone } from '../CountdownRender';
import { CountdownParentStyled, CountdownRowStyled } from '/@/components/StyledComponents'



const CardItemImgStyled = styled.div`
    width: 100%;
    height: 200px;
`

const TimeStyled = styled.span`
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 0.7rem;
`

const CardItemContentOverlayStyled = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px 20px 10px 20px;;
    overflow: hidden;
    transform: translateY(0);
    opacity: 1;
    visibility:visible;
    width: 100%;
    height: 84px;
    transition: all .3s;
    background: rgba(255,255,255,.9);
    z-index: 20;
`


const CardItemLabel = ({ col = 3, index = null }) => {

    return <LatestSectionItemLabel col={col} index={index}>
        <LatestSectionSpanStyled>
            <InertiaLink
                className="text-secondary text-decoration-underline"
                href={route("guest.events").toString()}>
                événements
            </InertiaLink>
        </LatestSectionSpanStyled>
        <LatestSectionH3Styled className="text-muted">
            à venir
        </LatestSectionH3Styled>
    </LatestSectionItemLabel>
}


const CardH5TitleLink = styled(H5TitleLink)`
    font-size: 1.10rem;
`


const CardItemData = ({ col = 3, event, showOnlySm = false, showOnlyMd = false, canShowInMd = false, index = null }) => {
    return <LatestSectionItemData
        col={col}
        index={index}
        showOnlySm={showOnlySm}
        showOnlyMd={showOnlyMd}
        canShowInMd={canShowInMd}>

        <LatestSectioCardItemStyled border={true} cardClass="p-0" bodyClass="p-1">

            <CardItemImgStyled>
                <ImageThumbnail height="100%" image={event.image} title={event.name} />
            </CardItemImgStyled>

            <CardItemContentOverlayStyled>
                <TimeStyled className="text-muted">
                    {event.start_date}
                </TimeStyled>

                <CardH5TitleLink title={event.name} href={event.route}>
                    {letterLimit(event.name)}
                </CardH5TitleLink>

            </CardItemContentOverlayStyled>
        </LatestSectioCardItemStyled>

    </LatestSectionItemData >

}

const H3CDStyled = styled.h3`
    font-weight: 600;
    border-bottom: solid 2px var(--bs-primary);
    display: inline-block;
    a{
        color: inherit;
    }
`



const FirstEventCountdown = ({ events = [] }) => {
    const event = events[0];
    const { isReady, handleComplete } = useCountdownDone(event?.ready)

    return <CountdownParentStyled data-aos="fade-up">
        <div className="container">
            <CountdownRowStyled className="row align-items-center">
                <div className="col-lg-6 h-100 mt-3 mt-lg-0">
                    <SubtitleLead>
                        {!isReady ? "Bientôt un événement" : "Événement prêt"}
                    </SubtitleLead>
                    <H3CDStyled className="h2 my-auto mb-2">
                        <InertiaLink href={event.route}>
                            {letterLimit(event.name)}
                        </InertiaLink>
                    </H3CDStyled>
                    <TimeStyled className="text-muted d-block">
                        {event.start_date}
                    </TimeStyled>
                </div>
                <div className="col-lg-6 my-3">
                    <CountdownRender
                        date={event.start_datetime}
                        isReady={isReady}
                        handleComplete={handleComplete} />
                </div>
            </CountdownRowStyled>
        </div>
    </CountdownParentStyled>
}

const UpcomingEvent = () => {
    // @ts-ignore
    const { events: { data: events } } = usePage().props

    return <div className="container-fluid">
        {!!events.length && <FirstEventCountdown events={events} />}
        {events.length > 1 && (
            <LatestSectionParentStyled className="row justify-content-center align-items-center pb-3">
                {
                    [null, ...events]
                        .map((event, i) => {
                            const col = events.length > 1 && events.length < 3 ? 4 : 3
                            return i === 0 ?
                                <CardItemLabel key={i} index={i + 1} col={col} /> :
                                <CardItemData
                                    key={event.id}
                                    index={i + 1}
                                    canShowInMd={i == 1}
                                    showOnlyMd={i == 2}
                                    showOnlySm={i == 3}
                                    col={col}
                                    event={event} />
                        })
                }
            </LatestSectionParentStyled>
        )}
    </div>
}




export default UpcomingEvent

import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { InertiaLink } from '@inertiajs/inertia-react'
import Countdown from 'react-countdown';
import NoContainerPadding from '/@/components/NoContainerPadding'
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



const CardItemImgStyled = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
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

const CountdownParentStyled = styled(NoContainerPadding)`
    background-color: rgba(255, 253, 253, 0.856);
    height: auto;
`

const CountdownRowStyled = styled.div`
    height: auto;
    min-height: 196px;
`

const datas = [
    {
        title: "Family Baptism Class",
        date: "February 6, 2017",
        // image: "http://www.satriathemes.club/blessing/img/events/pic%20(1).jpg"
    },
    {
        title: "Transforming Live",
        date: "February 10, 2017",
        // image: "http://www.satriathemes.club/blessing/img/events/pic%20(2).jpg"
    },
    {
        title: "Relationship With God",
        date: "February 20, 2017",
        // image: "http://www.satriathemes.club/blessing/img/events/pic%20(3).jpg"
    }
].slice(0, 3)



const CardItemLabel = ({ col = 3 }) => {

    return <LatestSectionItemLabel col={col}>
        <LatestSectionSpanStyled>
            <InertiaLink
                preserveScroll
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



const CardItemData = ({ col = 3, data, showOnlySm = false, showOnlyMd = false, canShowInMd = false }) => {
    return <LatestSectionItemData
        col={col}
        showOnlySm={showOnlySm}
        showOnlyMd={showOnlyMd}
        canShowInMd={canShowInMd}>

        <LatestSectioCardItemStyled border={true} cardClass="p-0" bodyClass="p-1">

            <CardItemImgStyled src={data.image} alt={data.title} />

            <CardItemContentOverlayStyled>
                <TimeStyled className="text-muted">
                    {data.date}
                </TimeStyled>

                <H5TitleLink href="#">
                    {data.title}
                </H5TitleLink>

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


const CountdownRow = ({ amount, title }) => {
    return <>
        <div className="col-3 text-center mb-4 mb-sm-0">
            <h6 className="h4 mb-2"><b>{amount}</b>&nbsp;</h6>
            <span className="text-muted">{title}</span>
        </div>
    </>
}


const rendererCountdown = ({ days, hours, minutes, seconds, completed }) => {

    if (!completed) {
        return <>
            <div className="row justify-content-between align-items-center">
                <CountdownRow amount={days} title={"Jours"} />
                <CountdownRow amount={hours} title={"Heures"} />
                <CountdownRow amount={minutes} title={"Minutes"} />
                <CountdownRow amount={seconds} title={"Secondes"} />
            </div>
        </>;
    }
};

const FirstEventCountdown = ({ datas = [] }) => {
    const data = datas[0];
    const [isReady, setIsReady] = useState(data.ready || false)
    const handleComplete = useCallback(() => setIsReady(true), [setIsReady])

    return <CountdownParentStyled data-aos="fade-up">
        <div className="container">
            <CountdownRowStyled className="row align-items-center">
                <div className="col-lg-6 h-100 mt-3 mt-lg-0">
                    <SubtitleLead>
                        {!isReady ? "Bientôt un événement" : "Événement prêt"}
                    </SubtitleLead>
                    <H3CDStyled className="h2 my-auto mb-2">
                        <InertiaLink href="/">
                            {data.title}
                        </InertiaLink>
                    </H3CDStyled>
                    <TimeStyled className="text-muted d-block">
                        {data.date}
                    </TimeStyled>
                </div>
                <div className="col-lg-6 my-3">
                    {
                        !isReady &&
                        // @ts-ignore
                        <Countdown
                            onComplete={handleComplete}
                            renderer={rendererCountdown}
                            date={Date.now() + 10000000}
                        />
                    }
                </div>
            </CountdownRowStyled>
        </div>
    </CountdownParentStyled>
}

const UpcomingEvent = () => {
    return <div className="container-fluid">
        {!!datas.length && <FirstEventCountdown datas={datas} />}
        {datas.length > 1 && (
            <LatestSectionParentStyled data-aos="fade-up" className="row justify-content-center align-items-center pb-3">
                {
                    [null, ...datas]
                        .map((data, i) => {
                            const col = datas.length > 1 && datas.length < 3 ? 4 : 3
                            return i === 0 ?
                                <CardItemLabel col={col} /> :
                                <CardItemData
                                    canShowInMd={i == 1}
                                    showOnlyMd={i == 2}
                                    showOnlySm={i == 3}
                                    col={col}
                                    data={data} />
                        })
                }
            </LatestSectionParentStyled>
        )}
    </div>
}




export default UpcomingEvent
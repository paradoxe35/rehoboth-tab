import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import CenterTitle from '/@/components/CenterTitle'


const datas = [
    {
        dayWeek: "Mercredi",
        from: "15-30m",
        to: "17-30m"
    },
    {
        dayWeek: "Samedi",
        from: "15-30m",
        to: "17-30m"
    },
    {
        dayWeek: "Dimanche",
        from: "15-30m",
        to: "17-30m"
    },
    {
        dayWeek: "Mardi",
        from: "15-30m",
        to: "17-30m"
    }
]

const ItemRowStyled = styled.div`
    visibility: visible;
    opacity: 500;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: solid 1px #eee;
    transition: border .7s;
    &:hover{
        border-bottom: solid 1px var(--bs-primary);
    }
`

const TimeDaytyled = styled.div`
    border-radius: 6px;
    color: var(--bs-light);
    width: 120px;
    letter-spacing: 1px;
    line-height: 18px;
    font-size: 14px;
    background-color: #9e8a6f;
`

const DayWeek = ({ data }) => {
    return <ItemRowStyled data-aos="fade-up">
        <div className="d-flex justify-content-between mb-3">
            <TimeDaytyled className=" p-3 text-center">
                <div>{data.from}</div>
                <div className="text-center">{"->"}</div>
                <div>{data.to}</div>
            </TimeDaytyled>
            <span className="text-muted">
                {data.dayWeek}
            </span>
        </div>
    </ItemRowStyled>
}

const OurPrograms = () => {
    const { t } = useTranslation()

    return <div className="container py-3">
        <CenterTitle className="h4 my-5" data-aos="fade-up">
            {t("Nos Programmes")}
        </CenterTitle>

        <div className="row justify-content-center">
            <div className="col-lg-8">
                {datas.map((d) => <DayWeek data={d} />)}
            </div>
        </div>
    </div>
}


export default OurPrograms
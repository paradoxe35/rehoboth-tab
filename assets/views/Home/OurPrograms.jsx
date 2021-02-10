import { usePage } from '@inertiajs/inertia-react'
import React from 'react'
import styled from 'styled-components'
import CenterTitle from '/@/components/CenterTitle'
import { ItemRowStyled } from '/@/components/StyledComponents'
import { capitalize, timeWithNoSeconds } from '/@/functions/functions'

const TimeDaytyled = styled.div`
    border-radius: 6px;
    color: var(--bs-light);
    width: 120px;
    letter-spacing: 1px;
    line-height: 18px;
    font-size: 14px;
    background-color: #9e8a6f;
`

const DayWeek = ({ programme }) => {
    return <div data-aos="fade-up">
        <ItemRowStyled title={programme.description}>
            <div className="d-flex justify-content-between mb-3" >
                <TimeDaytyled className=" p-3 text-center">
                    <div>{timeWithNoSeconds(programme.start_time)}</div>
                    <div className="text-center">{"->"}</div>
                    <div>{timeWithNoSeconds(programme.end_time)}</div>
                </TimeDaytyled>
                <span className="text-muted">
                    {capitalize(programme.day)}
                </span>
            </div>
        </ItemRowStyled>
    </div>
}

const OurPrograms = () => {
    // @ts-ignore
    const { programmes: { data: programmes } } = usePage().props

    return <div className="container py-3">
        <CenterTitle className="h4 my-5" data-aos="fade-up">
            Nos Programmes
        </CenterTitle>

        <div className="row justify-content-center">
            <div className="col-lg-8">
                {programmes.map((d, i) => <DayWeek key={i} programme={d} />)}
            </div>
        </div>
    </div>
}


export default OurPrograms
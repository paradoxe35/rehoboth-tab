import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import styled from 'styled-components'
import ImageThumbnail from '/@/components/ImageThumbnail'
import { letterLimit, monthDayYear, timeWithNoSeconds } from '/@/functions/functions'
import H5TitleLink from '/@/components/H5TitleLink';
import { LaravelPagination } from '/@/components/Pagination'
import { useListDataPaginator } from '/@/utils/hooks'
import { Inertia } from '@inertiajs/inertia'

const ItemContainer = styled.div`
    background-color: rgba(154,136,75,0.1);
    &:hover{
        .hover-bg {
            background: var(--bs-secondary);
        }
    }
`

const DateTimeDiv = styled.div`
    padding: 20px;
    color: var(--bs-light);
    background: var(--bs-primary);
    transition: .5s;
    height: 100%;
    .date {
        font-size: 62px;
        font-weight: 800;
        display: block;
        line-height: 72px;
    }
    .month {
        margin-top: 10px;
        font-size: 30px;
        display: block;
        letter-spacing: 5px;
    }
    .time {
        margin-top: 30px;
        display: block;
    }
`

const EventItem = ({ event }) => {
    const date = monthDayYear(event.start_date)

    return <>
        <div className="row">
            <div className="col-7 m-0 p-0">
                <div className="h-100">
                    <InertiaLink href={event.route}>
                        <ImageThumbnail height="100%" image={event.image} />
                    </InertiaLink>
                </div>
            </div>
            <div className="col-5 m-0 p-0">
                <DateTimeDiv className="d-flex justify-content-center align-items-center flex-column hover-bg">
                    <span className="date">{date.day}</span>
                    <span className="month">{date.month}</span>
                    <span className="time">{timeWithNoSeconds(event.start_time)}</span>
                </DateTimeDiv>
            </div>
        </div>
        <div className="desc row">
            <div className="col m-4">
                <H5TitleLink href={event.route}>
                    {letterLimit(event.name, 50)}
                </H5TitleLink>
                <span className="text text-sm text-muted">
                    {letterLimit(event.description, 210)}
                </span>
            </div>
        </div>
    </>
}

const EventsIndex = () => {
    // @ts-ignore
    const { events } = usePage().props

    const { listData, onPageChange } = useListDataPaginator(events, onClickPagination)

    function onClickPagination(page) {
        Inertia.get(route('guest.events', { page }).toString())
    }


    let datas = (events?.data || [])
    if (datas.length > 0 && ((datas.length % 2) !== 0)) datas.push(null)

    return <div className="container-fluid">
        <div className="container my-5">
            <div className="row justify-content-center">
                {datas.map(event => {
                    return event === null ?
                        <div className="col-lg-5 mx-lg-4 mx-xl-4" /> :
                        <ItemContainer className="col-lg-5 mb-5 mx-lg-4 mx-xl-4">
                            <EventItem event={event} />
                        </ItemContainer>
                })}
            </div>
            <div className="d-flex justify-content-center">
                <LaravelPagination listData={listData} getDataPaginator={onPageChange} />
            </div>
        </div>
    </div>
}


export default EventsIndex
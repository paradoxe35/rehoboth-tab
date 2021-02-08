import React from 'react'
import { Pagination } from 'react-laravel-paginex'
import styled from 'styled-components'

const Paginator = styled.div`
    .page-item {
        margin: 0 7px;
        .page-link {
            border-radius: 9px;
        }
    }
`

export const LaravelPagination = ({ listData, getDataPaginator }) => {
    return <Paginator>
        {listData.meta && listData.meta.total >
            listData.meta.per_page && <Pagination
                buttonIcons={false}
                prevButtonText="&laquo;"
                nextButtonText="&raquo;"
                changePage={getDataPaginator}
                data={listData} />}
    </Paginator>
}
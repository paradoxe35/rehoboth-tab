import React from 'react'
import { Pagination } from 'react-laravel-paginex'

export const LaravelPagination = ({ listData, getDataPaginator }) => {
    return <>
        {listData.meta && listData.meta.total >
            listData.meta.per_page && <Pagination
                buttonIcons={false}
                // prevButtonIcon='ni ni-bold-left'
                // nextButtonIcon='ni ni-bold-right'
                changePage={getDataPaginator}
                data={listData} />}
    </>
}
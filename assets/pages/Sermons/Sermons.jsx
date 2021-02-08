import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React from "react";
import { LaravelPagination } from "/@/components/Pagination";
import Hero from "/@/layouts/Hero/Hero";
import { useListDataPaginator } from "/@/utils/hooks";
import SermonsItem from "/@/views/SermonsItem";


const Sermons = () => {
    // @ts-ignore
    const { sermons } = usePage().props

    const { listData, onPageChange } = useListDataPaginator(sermons, onClickPagination)

    function onClickPagination(page) {
        Inertia.get(route('guest.sermons', { page }).toString())
    }

    return <Hero title={"Sermons"}>
        <div className="container py-3 mb-5">
            <div className="row justify-content-center mb-3">
                <div className="col-lg-10 mt-3">
                    {(sermons?.data || []).map(sermon => <SermonsItem key={sermon.id} sermon={sermon} />)}
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <LaravelPagination listData={listData} getDataPaginator={onPageChange} />
            </div>
        </div>
    </Hero>
}

export default Sermons;
import React, { useEffect } from 'react'
import { LaravelPagination } from '/@/components/admin/Pagination'
import Card from '/@/components/Card'
import { useListDataPaginator } from '/@/utils/hooks'


const Tab = () => {
    const [listData, setListData, onPageChange] = useListDataPaginator(null, onChangePagination)

    useEffect(() => {

    }, [])

    async function onChangePagination(page) {

    }

    return <Card>
        <div className="row mb-3">
            <div className="col-lg-5">
                <form className="d-flex">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Nom, ID, Phone"
                        aria-label="Search" />
                    <button className="btn btn-outline-primary" type="submit">
                        Rechercher
                    </button>
                </form>
            </div>
        </div>

        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">ID</th>
                        <th scope="col">Ticket</th>
                        <th scope="col">Payé</th>
                        <th scope="col">Enregistré le</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(listData?.data || []).map((data, i) => {
                        const ticket = data?.ticket_option
                        return <tr key={data.id || i}>
                            <td>{data.name}</td>
                            <td>{data.phone}</td>
                            <td>{data.email}</td>
                            <td>{data.regid}</td>
                            <td>{ticket?.name + ' ' + (ticket?.price ? `$${ticket?.price}` : '')}</td>
                            <td>{data.paid ? 'Oui' : 'Non'}</td>
                            <td>{data.created_at}</td>
                            <td></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

        <LaravelPagination listData={listData} getDataPaginator={onPageChange} />
    </Card>
}


export default Tab
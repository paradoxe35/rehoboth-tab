import { usePage } from '@inertiajs/inertia-react'
import React from 'react'
import SermonsItem from '../SermonsItem'
import CenterTitle from '/@/components/CenterTitle'



const LatestSermons = () => {
    // @ts-ignore
    const { sermons } = usePage().props
    return <div className="container py-3">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <CenterTitle className="h3 my-5">
                        Derniers sermons
                    </CenterTitle>
                    {sermons.map(sermon => <SermonsItem key={sermon.id} sermon={sermon} />)}
                </div>
            </div>
        </div>
}


export default LatestSermons
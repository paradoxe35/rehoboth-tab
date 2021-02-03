import { usePage } from '@inertiajs/inertia-react'
import React from 'react'
import styled from 'styled-components'
import Card from '/@/components/Card'
import CenterTitle from '/@/components/CenterTitle'
import TextMuted from '/@/components/TextMuted'
import pastor from '/@/images/pastor/pastor.jpeg'


const ImgStyled = styled.img`
    height: 400px;
`

const AbountChurch = () => {
    // @ts-ignore
    const { pastorName, appName } = usePage().props

    return <div className="container py-3">
        <CenterTitle className="h3 my-5" data-aos="fade-up">
            À propos de l'Église
        </CenterTitle>

        <h2 data-aos="fade-up" className="h6 text-center text-secondary subtitle font-weight-600">
            {appName} {"Tabernacle"}
        </h2>

        <div data-aos="fade-up" className="row justify-content-center mt-4">
            <div className="col-lg-8">
                <p className="">
                    <TextMuted>
                        One morning, when Gregor Samsa woke from troubled dreams,
                        he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back,
                        and if he lifted his head a little he could see his brown belly,
                        slightly domed and divided by arches into stiff sections
                    </TextMuted>
                </p>
            </div>
        </div>

        <div data-aos="fade-up" className="row justify-content-center mt-5">
            <div className="col-lg-6 col-md-8 mb-3">
                <Card bodyClass="p-1" border={true}>
                    <div className="card-scale shadow-0 border-0 card">
                        <ImgStyled
                            src={pastor}
                            alt={pastorName}
                            className="img-scale img-thumbnail card-img img-fluid object-fit--cover" />
                    </div>
                    <div className="subtitle text-center text-secondary my-2">
                        <small>
                            {"Pasteur"} {pastorName}
                        </small>
                    </div>
                </Card>
            </div>
        </div>
    </div>
}




export default AbountChurch
import React from 'react'
import styled from 'styled-components'
import LogoApp from '../headers/LogoApp'
import GetNotifiedForm from './GetNotifiedForm'
import { FiMail } from "react-icons/fi"
import Copyright from './Copyright'
import wmb from '/@/images/message/wmb.jpeg'
import jesus from '/@/images/message/jesus-christ.jpeg'
import { InertiaLink } from '@inertiajs/inertia-react'


const FooterStyled = styled.footer`
    background-color: var(--bs-light);
`

const FooterLogoStyled = styled(LogoApp)`
    a {
        color: #525050;
    }
`

const SpanStyled = styled.p`
    margin-top: 1rem;
    margin-left: 0.5px;
`

const H5Styled = styled.p`
    margin-top: 1rem;
    margin-left: 0.5px;
`

const ImgContainer = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 7px;
    border: 1px solid #ced4da;
`

const Footer = () => {

    return <FooterStyled>
        <div className="container py-5">
            <div className="row justify-content-center py-5">
                <div className="col-lg-5 mb-3">
                    <FooterLogoStyled />

                    <div className="d-flex mt-3">
                        <ImgContainer src={wmb} alt="William Marrion Branham" className="object-fit--cover" />
                        <div className="mx-2" />
                        <ImgContainer src={jesus} alt="Jesus Christ" className="object-fit--cover" />
                    </div>

                    <SpanStyled className="text-sm d-block">
                        “Si tu amènes les gens à te croire, et que tu es sincère quand tu pries, rien ne résistera à tes prières, pas même le cancer.”
                    </SpanStyled>
                    <a
                        className="text-sm text-decoration-underline"
                        href={`https://branham.org/fr/williambranham`}
                        target="_blank">
                        {`https://branham.org`}
                    </a>
                    <div>
                        <InertiaLink
                            className="text-sm text-decoration-underline"
                            href={route('guest.contact').toString()}>
                            Adresse et contact
                    </InertiaLink>
                    </div>
                </div>
                <div className="col-lg-1" />
                <div className="col-lg-5 mb-3">
                    <H5Styled>
                        <b>Notifications <FiMail /></b>
                    </H5Styled>
                    <p className="text-sm text-muted">
                        Restez informé de nos nouveaux événements en recevant des notifications par e-mail.
                    </p>
                    <GetNotifiedForm />
                </div>
            </div>
            <Copyright />
        </div>
    </FooterStyled>
}

export default Footer
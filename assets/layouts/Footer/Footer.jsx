import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import LogoApp from '../headers/LogoApp'
import GetNotifiedForm from './GetNotifiedForm'
import { FiMail } from "react-icons/fi"
import Copyright from './Copyright'
import Card from '/@/components/Card'
import wmb from '/@/images/message/wmb.jpeg'
import jesus from '/@/images/message/jesus-christ.jpeg'


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
    const { t, i18n } = useTranslation()

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
                        “{t("Si tu amènes les gens à te croire, et que tu es sincère quand tu pries, rien ne résistera à tes prières, pas même le cancer.")}”
                    </SpanStyled>
                    <a
                        className="text-sm text-decoration-underline"
                        href={`https://branham.org/${i18n.language}/williambranham`}
                        target="_blank">
                        {`https://branham.org`}
                    </a>
                    <a
                        className="text-sm text-decoration-underline d-block"
                        href={route('guest.contact').toString()}>
                        {t("Adresse et contact")}
                    </a>
                </div>
                <div className="col-lg-1" />
                <div className="col-lg-5 mb-3">
                    <H5Styled>
                        <b>{t("Notifications")} <FiMail /></b>
                    </H5Styled>
                    <p className="text-sm text-muted">
                        {t("Restez informé de nos nouveaux événements en recevant des notifications par e-mail")}.
                    </p>
                    <GetNotifiedForm />
                </div>
            </div>
            <Copyright />
        </div>
    </FooterStyled>
}

export default Footer
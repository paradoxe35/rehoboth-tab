import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ApiRequestAxios } from "/@/api/axios";
import { customerCountryApi } from "/@/api/services";
import AddressText from "/@/components/AddressText";
import Button from "/@/components/admin/Button";
import FormTextControl from "/@/components/FormTextControl";
import { Iframe } from "/@/components/Iframe";
import { capitalize, letterLimit, timeWithNoSeconds } from "/@/functions/functions";
import { SocialLinks } from "/@/layouts/headers/NavHeader";
import SocialIcons from "/@/layouts/headers/SocialIcons";
import Hero from "/@/layouts/Hero/Hero";
import { embedGoogleMap } from "/@/utils/vars";


const MapContainer = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 320px;
`

const MapFlow = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: rgba(121, 120, 118, 0.1);
`

const Map = styled(Iframe)`
    position: absolute;
    z-index: 1;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    padding: 0px;
    border-width: 0px;
    margin: 0px;
`

const ContactWrapper = styled.div`
    border-radius: 10px;
    background: rgba(154, 136, 75, 0.137);
    /* padding: 20px 60px 40px 60px; */
`

const FormLead = styled.h3`
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 400;
`


const SuccesDiv = styled.div`
    background: rgba(255, 234, 163, 0.336);
    border-radius: 10px;
`


const SuccessMessage = ({ text }) => {
    return <SuccesDiv className="p-3 text-success text-sm">
        {text}
    </SuccesDiv>
}

const FormContact = () => {
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(null)
    const clientGeo = useRef({ country_name: null, country_code: null })

    useEffect(() => {
        customerCountryApi()
            .then(({ data: { country_code, country_name } }) => {
                clientGeo.current = { country_code, country_name }
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        const form = new FormData(e.target)
        let clientGeoData = clientGeo.current
        clientGeoData.country_name && form.set('country_name', clientGeoData.country_name)
        clientGeoData.country_code && form.set('country_code', clientGeoData.country_code)

        ApiRequestAxios(route('guest.contact'), 'post', form)
            .then(({ data: { message } }) => setSuccess(message))
            .catch((error) => {
                if (error?.errors) {
                    setErrors(error.errors || {})
                }
            })
            .finally(() => setLoading(false))
    }

    return <ContactWrapper className="px-3 pt-3 px-md-5 pb-4">
        <FormLead className="mb-4">
            Envoie-nous un message
        </FormLead>
        {!!success && <SuccessMessage text={success} />}
        {
            !success && (
                <form autoComplete="off" onSubmit={handleSubmit} noValidate>
                    <FormTextControl errors={errors} label="Votre Nom" name="name" />
                    <FormTextControl errors={errors} label="Votre Email" name="email" type="email" />
                    <FormTextControl errors={errors} label="Sujet" name="subject" />
                    <FormTextControl errors={errors} label="Message" name="message" textarea={true} />
                    <Button text="Envoyer" loading={loading} className="btn-sm" type="submit" />
                </form>
            )
        }
    </ContactWrapper>
}


const SocialLinksWrapper = styled(SocialLinks)`
    padding: 0px;
    a {
        font-size: 2rem;
        margin-left: 1rem;
    }
`

const SocialIconsStyled = styled(SocialIcons)`
    text-align: center;
    margin-right: 35px;
`

const Address = () => {
    // @ts-ignore
    const { church_details: { data: details }, programmes: { data: programmes } } = usePage().props

    const address = details?.address

    return <div className="text-center">
        <SocialLinksWrapper>
            <SocialIconsStyled />
        </SocialLinksWrapper>
        {
            (details?.email || details?.phone) && (
                <>
                    <hr />
                    <h5>Coordonnées</h5>
                    {details?.phone && <div className="my-1 text-muted text-xs">Phone: {details?.phone}</div>}
                    {details?.email && <div className="my-1 text-muted text-xs">Email: {details?.email}</div>}
                </>
            )
        }

        {
            !!programmes.length && (
                <>
                    <hr />
                    <h5>Heure de l'église</h5>
                    <div className="text-muted">
                        {programmes.map(prog => {
                            return <div className="my-1 text-xs" title={prog.description}>
                                {capitalize(prog.day)}{" "}
                                {timeWithNoSeconds(prog.start_time)} -&gt; {timeWithNoSeconds(prog.end_time)}
                            </div>
                        })}
                    </div>
                </>
            )
        }

        {
            address && (
                <>
                    <hr />
                    <h5>Adresse</h5>
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-muted text-xs">
                                <AddressText address={address} />
                            </div>
                        </div>
                    </div>
                </>
            )
        }

        {
            details?.description && (
                <>
                    <hr />
                    <h5>À propos de l'église</h5>
                    <div className="text-muted text-xs">
                        <span title={details.description}>{letterLimit(details.description, 255)}</span>
                    </div>
                </>
            )
        }
    </div>
}

const Contact = () => {
    // @ts-ignore
    const { church_details: { data: details } } = usePage().props

    return <Hero title={"Contact"} heroClass={null}>
        {
            details?.address?.map && (
                <MapContainer>
                    <MapFlow />
                    <Map loaderClass="h-50"
                        src={embedGoogleMap(details.address.latitude, details.address.longitude)} />
                </MapContainer>
            )
        }

        <div className="container">
            <div className="row justify-content-center py-5">
                <div className="col-lg-6 mb-4">
                    <FormContact />
                </div>
                <div className="col-lg-5 mb-4">
                    <Address />
                </div>
            </div>
        </div>
    </Hero>
}

export default Contact;
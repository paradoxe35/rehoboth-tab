import { usePage } from "@inertiajs/inertia-react";
import React from "react";
import styled from "styled-components";
import Button from "/@/components/admin/Button";
import { Iframe } from "/@/components/Iframe";
import { capitalize, timeWithNoSeconds } from "/@/functions/functions";
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
    padding: 20px 60px 40px 60px;
`

const FormLabel = styled.label`
    letter-spacing: 1px;
`

const FormLead = styled.h3`
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 400;
`


const FormContact = () => {
    return <ContactWrapper>
        <FormLead className="mb-4">
            Envoie-nous un message
        </FormLead>
        <form autoComplete="off">
            <div className="mb-3">
                <FormLabel htmlFor="name-i" className="form-label text-xs text-muted">
                    Votre Nom
                </FormLabel>
                <input type="text" required className="form-control border-radius-0" id="name-i" />
            </div>
            <div className="mb-3">
                <FormLabel htmlFor="email-i" className="form-label text-xs text-muted">
                    Votre Email
                </FormLabel>
                <input type="email" required className="form-control border-radius-0" id="email-i" />
            </div>
            <div className="mb-3">
                <FormLabel htmlFor="subject-i" className="form-label text-xs text-muted">
                    Sujet
                </FormLabel>
                <input type="email" required className="form-control border-radius-0" id="subject-i" />
            </div>
            <div className="mb-3">
                <FormLabel htmlFor="textarea-i" className="form-label text-xs text-muted">
                    Message
                </FormLabel>
                <textarea required className="form-control border-radius-0" id="textarea-i" rows={5}></textarea>
            </div>

            <Button text="Envoyer" className="btn-sm" type="submit" />
        </form>
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
    const { church_details: details, programmes } = usePage().props

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
                    <div className="my-1 text-muted text-xs">Phone: {details?.phone}</div>
                    <div className="my-1 text-muted text-xs">Email: {details?.email}</div>
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
                            return <div className="my-1 text-xs">
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
                                {address?.address} {address?.venue}{address?.venue && address?.address ? ',' : ''} {address?.city} {address?.state} {address?.country}
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    </div>
}

const Contact = () => {
    // @ts-ignore
    const { church_details: details } = usePage().props

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
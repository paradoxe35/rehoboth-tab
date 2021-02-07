import React, { useState } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import { FiVolume2, FiVideo, FiFileText } from "react-icons/fi";
import { getIdYtLink, letterLimit } from '/@/functions/functions'
import bibleImage from '/@/images/sermon/bible.jpeg'
import ImageThumbnail from '/@/components/ImageThumbnail'
import FetchProfile from './FetchProfile'
import styled from 'styled-components'
import Card from '/@/components/Card'
import { Iframe, ObjectElement } from '../components/Iframe';
import { createPortal } from 'react-dom'


const ImgContainerStyled = styled.div`
    width: 180px;
`

const ItemRowStyled = styled.div`
    visibility: visible;
    opacity: 500;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: solid 1px #eee;
    transition: border .7s;

    &:hover{
        border-bottom: solid 1px var(--bs-primary);
    }
`

const ItemHeaderContainerStyled = styled.div`
    @media (max-width: 991.98px) {
        background-color: rgba(154,136,75,0.137);
        padding-top: 10px;
        padding-bottom: 10px;
    }
`

const H3TitleStyled = styled.h3`
    font-size: 17px;
    a {
        color: inherit;
        &:hover {
            text-decoration: underline;
        }
    }
`

const DivDetailsStyled = styled.div`
    font-size: 13px;
`

const MediaLinksStyled = styled.span`
    svg {
        transition: .5s;
        color: var(--bs-light);
        font-size: 24px;
        padding: 15px;
        width: 50px;
        height: 50px;
        text-align: center;
        margin-left: 10px;
        border-radius: 5px;
        background: var(--bs-primary);
        transition: all 0.4s;
        &:hover {
            background: var(--bs-primary-hover);
            color: var(--bs-light);
        }
    }
`
const MediaPopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.8);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 70px 80px 20px 80px;
    animation: youtubePopup .5s both;
    @keyframes youtubePopup {
        from {
            opacity: 0
        }
        to {
            opacity: 1
        }
    }
`


const EmbedElement = (component) => styled(component)`
        width: 100%;
        height: 80%;
        animation: youtubePopupIframe .5s .3s both;
        @keyframes youtubePopupIframe {
            from {
                opacity: 0;
                transform: translateY(-100px)
            }
            to {
                opacity: 1;
                transform: translateY(0)
            }
        }
`

const IframePopup = EmbedElement(Iframe)
const ObjectPopup = EmbedElement(ObjectElement)

const CloseMediaPopup = styled.div`
    position: absolute;
    top: 30px;
    right: 30px;
    color: rgba(255,255,255,.7);
    font-size: 25px;
    transition: color .3s;
    cursor: pointer;
    button {
        width: 5px;
        height: 5px;
    }
`

const Audio = styled.audio`
    & {
        height: 40px;
    }
`


const FigureThumbnail = styled.figure`
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0;
    padding: 0;
    &:after {
        padding-top: 56.25%;
        min-height: auto;
        content: "";
        width: 100%;
        display: block;
    }
`


const MediaContainer = ({ children }) => {
    return <div className="w-100 h-100">
        <div className="row justify-content-center h-100">
            <div className="col-lg-6 col-lg-8 h-100 col-12">
                {children}
            </div>
        </div>
    </div>
}

const ControlButtons = ({ setIndex, total, index }) => {
    return <nav className="d-flex justify-content-center mt-2">
        <ul className="pagination">
            <li className="page-item">
                <a className={`page-link bg-transparent text-lg text-light border-0 ${index <= 0 ? 'disabled' : ''}`}
                    href="javascript:;"
                    aria-disabled={index <= 0}
                    onClick={() => setIndex(p => p <= 0 ? p : (p - 1))}
                    aria-label="Précédent">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        </ul>

        <div className="mx-3 text-center">
            <div style={{ padding: "0.65rem" }}>
                <span className="text-muted">{index + 1} / {total}</span>
            </div>
        </div>

        <ul className="pagination">
            <li className="page-item">
                <a className={`page-link bg-transparent text-lg text-light border-0 ${(index + 1) >= total ? 'disabled' : ''}`}
                    href="javascript:;"
                    aria-disabled={(index + 1) >= total}
                    onClick={() => setIndex(p => (p + 1) >= total ? p : p + 1)}
                    aria-label="Suivant">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
}

const VideoMedia = ({ video, sermon }) => {
    return <MediaContainer>
        <h5 className="text-light mb-3 text-center">{sermon.subject}</h5>
        <FigureThumbnail>
            <IframePopup
                frameBorder="0"
                allowFullScreen
                width={560}
                height={315}
                src={`https://www.youtube.com/embed/${getIdYtLink(video.path)}`} />
        </FigureThumbnail>

    </MediaContainer>
}



const AudiosMedia = ({ audios, sermon }) => {
    const [index, setIndex] = useState(0)
    const audio = audios[index]
    return <MediaContainer>
        <div className="d-flex justify-content-center flex-column align-items-center h-75">
            <h5 className="text-light mb-2 text-center">{sermon.subject} - {index + 1}</h5>
            <Audio preload="none" controls playsInline controlsList="nodownload" key={audio.id}>
                <source src={audio.public_path} type="audio/mpeg" />
            </Audio>
            {audios.length > 1 && <ControlButtons setIndex={setIndex} total={audios.length} index={index} />}
        </div>
    </MediaContainer>
}


const DocumentsMedia = ({ documents, sermon }) => {
    const [index, setIndex] = useState(0)
    const document = documents[index]

    return <MediaContainer>
        <h5 className="text-light mb-3 text-center">{sermon.subject}</h5>
        {documents.length > 1 && <ControlButtons setIndex={setIndex} total={documents.length} index={index} />}
        <FigureThumbnail>
            <ObjectPopup
                key={document.id}
                type="application/pdf"
                data={document.public_path} />
        </FigureThumbnail>

    </MediaContainer>
}



const MediaPopup = ({ children = null, setSection }) => {
    return createPortal(
        <MediaPopupContainer>
            <CloseMediaPopup>
                <button
                    type="button"
                    onClick={() => setSection(null)}
                    className="btn-close btn-close-white" aria-label="Close"></button>
            </CloseMediaPopup>
            {children}
        </MediaPopupContainer>,
        document.body
    )
}

const MediaToggle = ({ toggle, setSection, children }) => {
    return <>
        {
            toggle ? (
                <MediaPopup setSection={setSection}>
                    {children}
                </MediaPopup>
            ) : null
        }
    </>
}

const Media = ({ media, sermon }) => {
    const [section, setSection] = useState(null)

    return <MediaLinksStyled>
        <a href="javascript:;">
            {!!media.video && <FiVideo onClick={() => setSection('video')} />}
            <MediaToggle setSection={setSection} toggle={section === 'video'}>
                <VideoMedia sermon={sermon} video={media.video} />
            </MediaToggle>
        </a>
        <a href="javascript:;">
            {!!media.audios.length && <FiVolume2 onClick={() => setSection('audios')} />}
            <MediaToggle setSection={setSection} toggle={section === 'audios'}>
                <AudiosMedia sermon={sermon} audios={media.audios} />
            </MediaToggle>
        </a>
        <a href="javascript:;">
            {!!media.documents.length && <FiFileText onClick={() => setSection('documents')} />}
            <MediaToggle setSection={setSection} toggle={section === 'documents'}>
                <DocumentsMedia sermon={sermon} documents={media.documents} />
            </MediaToggle>
        </a>
    </MediaLinksStyled>
}


const SermonsItem = ({ sermon }) => {
    const { media } = sermon

    return <ItemRowStyled className="row align-items-center justify-content-between" data-aos="fade-up">
        <ItemHeaderContainerStyled className="col-lg-8 mb-3 mb-lg-0">
            <div className="d-flex align-items-center">
                <ImgContainerStyled>
                    <Card bodyClass="p-2" border={true} cardClass="p-0">
                        {
                            sermon.image ? <ImageThumbnail height="100%" image={sermon.image} title={sermon.subject} /> :
                                <img src={bibleImage} className="img-fluid" alt={sermon.subject} />
                        }
                    </Card>
                </ImgContainerStyled>
                <div className="mx-2"></div>
                <div className="mid-col">
                    <H3TitleStyled>
                        <InertiaLink href={sermon.route} title={sermon.subject}>
                            {letterLimit(sermon.subject, 30)}
                        </InertiaLink>
                    </H3TitleStyled>
                    <DivDetailsStyled className="text-muted">
                        <span>
                            {"Par"} <FetchProfile name={sermon.preacher} />, {sermon.date}
                        </span>
                    </DivDetailsStyled>
                </div>
            </div>
        </ItemHeaderContainerStyled>

        <div className="col-lg-4 text-center">
            <Media media={media} sermon={sermon} />
        </div>
    </ItemRowStyled>
}



export default SermonsItem
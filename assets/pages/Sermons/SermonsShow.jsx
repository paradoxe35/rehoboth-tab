import React from 'react'
import styled from 'styled-components';
import Hero from '/@/layouts/Hero/Hero'
import { MediaController, SermonCover, SermonDetails } from '/@/views/SermonsItem';


const MediaWrapper = styled.div`
    a {
        display: block;
        color: #333;
        font-size: 16px;
        padding: 15px 20px 15px 20px;
        margin-bottom: 10px;
        border: solid 2px #ddd;
        text-decoration: none;
        border-radius: 5px;
        outline: none !important;
        transition: .5s;
        &:hover {
            background: var(--bs-primary);
            border-color: var(--bs-primary);
            color: #fff;
        }
        svg {
            font-size: 18px;
            margin-right: 10px;
        }
    }
`


const SermonsShow = ({ sermon: { data: sermon } }) => {

    return <Hero title={`Sermons`} headTitle={`Sermon - ${sermon.subject}`}>
        <div className="container-fluid mb-5">
            <div className="container">
                <div className="row justify-content-center">
                    <h1 className="col-md-11 mb-3 h4">{sermon.subject}</h1>
                    <div className="col-md-7">
                        <SermonCover height="auto" sermon={sermon} />

                        <SermonDetails sermon={sermon} className="mt-3" />
                        <hr />
                        <p className="text-muted text-sm">{sermon.description}</p>
                    </div>
                    <div className="col-md-4">
                        <MediaWrapper className="d-flex flex-column">
                            <MediaController
                                audioText="Streaming audio"
                                documentText="Télécharger le PDF"
                                videoText="Streaming vidéo"
                                sermon={sermon} />
                        </MediaWrapper>
                    </div>
                </div>
            </div>
        </div>
    </Hero>
}


export default SermonsShow
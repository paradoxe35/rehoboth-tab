import { InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import styled from 'styled-components'
import Card from '/@/components/Card'
import CenterTitle from '/@/components/CenterTitle'
import { FiVolume2, FiVideo, FiFileText } from "react-icons/fi";

const datas = [
    {
        theme: "Transforming Live, Restoring Hope",
        preacher: "Charles Ngwasi",
        date: "February 08, 2017",
        // image: "http://www.satriathemes.club/blessing/img/sermons/pic%20(1).jpg",
        media: {
            document: {},
            video: {},
            audio: {},
        }
    },
    {
        theme: "Put Your Faith Into Action",
        preacher: "Charles Ngwasi",
        date: "February 15, 2017",
        // image: "http://www.satriathemes.club/blessing/img/sermons/pic%20(2).jpg",
        media: {
            document: {},
            video: {},
            audio: {},
        }
    },
    {
        theme: "Find And You Shall Seek",
        preacher: "Charles Ngwasi",
        date: "February 22, 2017",
        // image: "http://www.satriathemes.club/blessing/img/sermons/pic%20(3).jpg",
        media: {
            document: {},
            video: {},
            audio: {},
        }
    }
].slice(0, 3)

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

const SermonsItem = ({ data }) => {
    const { media } = data

    return <ItemRowStyled className="row align-items-center justify-content-between" data-aos="fade-up">
        <ItemHeaderContainerStyled className="col-lg-8 mb-3 mb-lg-0">
            <div className="d-flex align-items-center">
                <ImgContainerStyled>
                    <Card bodyClass="p-2" border={true} cardClass="p-0">
                        <img src={data.image} className="img-fluid" alt={data.theme} />
                    </Card>
                </ImgContainerStyled>
                <div className="mx-2"></div>
                <div className="mid-col">
                    <H3TitleStyled>
                        <InertiaLink href="#">
                            {data.theme}
                        </InertiaLink>
                    </H3TitleStyled>
                    <DivDetailsStyled className="text-muted">
                        <span>
                            {"Par"} <InertiaLink href="#">{data.preacher}</InertiaLink>, {data.date}
                        </span>
                    </DivDetailsStyled>
                </div>
            </div>
        </ItemHeaderContainerStyled>

        <div className="col-lg-4 text-center">
            <MediaLinksStyled>
                <a href="#">
                    {media.video && <FiVideo />}
                </a>
                <a href="#">
                    {media.audio && <FiVolume2 />}
                </a>
                <a href="#">
                    {media.document && <FiFileText />}
                </a>
            </MediaLinksStyled>
        </div>
    </ItemRowStyled>
}


const LatestSermons = () => {

    return <>
        <div className="container py-3">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <CenterTitle className="h3 my-5">
                        Derniers sermons
                    </CenterTitle>
                    {datas.map(data => <SermonsItem data={data} />)}
                </div>
            </div>
        </div>
    </>
}


export default LatestSermons
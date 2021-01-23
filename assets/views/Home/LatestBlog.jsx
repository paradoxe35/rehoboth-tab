import { InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import {
    LatestSectioCardItemStyled,
    LatestSectionH3Styled,
    LatestSectionItemData,
    LatestSectionItemLabel,
    LatestSectionParentStyled,
    LatestSectionSpanStyled
} from './components/LatestSectionCard'
import H5TitleLink from '/@/components/H5TitleLink'
import TextMuted from '/@/components/TextMuted'


const datas = [
    {
        title: "Crouch goes Home to Jesus",
        date: "February 6, 2017",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in"
    },
    {
        title: "10 Bible Verses for 2017",
        date: "February 10, 2017",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in"
    },
    {
        title: "Crouch goes Home to Jesus",
        date: "February 20, 2017",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in"
    }
].slice(0, 3)


const CardItemLabel = ({ col = 3 }) => {
    const { t } = useTranslation()

    return <LatestSectionItemLabel col={col}>

        <LatestSectionH3Styled className="text-muted">
            {t("Derniers")}
        </LatestSectionH3Styled>

        <LatestSectionSpanStyled>
            <InertiaLink
                preserveScroll
                className="text-secondary text-decoration-underline"
                href={route("guest.blog").toString()}>
                {t("Blogs")}
            </InertiaLink>
        </LatestSectionSpanStyled>
    </LatestSectionItemLabel>
}

const SpanDateStyled = styled.span`
    background: var(--bs-primary);
    padding: 2px 10px 2px 10px;
    color: var(--bs-light);
    font-size: 12px;
    border-radius: 3px;
`

const SpanDescriptionStyled = styled.span`
    font-size: 12px;
`

const CardItemContainer = styled(LatestSectioCardItemStyled)`
    transition: .5s;
    &:hover {
        border: solid 1px var(--bs-secondary) !important;
    }
`


const CardItemData = ({ col = 3, data, showOnlySm = false, showOnlyMd = false, canShowInMd = false }) => {
    return <LatestSectionItemData
        col={col}
        showOnlySm={showOnlySm}
        showOnlyMd={showOnlyMd}
        canShowInMd={canShowInMd}>

        <CardItemContainer border={true} cardClass="p-0 bg-transparent mt-2" bodyClass="p-3">
            <SpanDateStyled>
                {data.date}
            </SpanDateStyled>

            <TextMuted>
                <H5TitleLink href="#" className="my-2 h5">
                    {data.title}
                </H5TitleLink>
            </TextMuted>

            <SpanDescriptionStyled className="desc text-muted">
                {data.description}
            </SpanDescriptionStyled>

        </CardItemContainer>

    </LatestSectionItemData >
}


const LatestBlog = () => {
    return <div className="container-fluid">
        <LatestSectionParentStyled data-aos="fade-up" className="row justify-content-center align-items-center pb-3">
            {
                [null, ...datas]
                    .map((data, i) => {
                        const col = datas.length > 0 && datas.length < 3 ? 4 : 3
                        return i === 0 ?
                            <CardItemLabel col={col} /> :
                            <CardItemData
                                canShowInMd={i == 1}
                                showOnlyMd={i == 2}
                                showOnlySm={i == 3}
                                col={col}
                                data={data} />
                    })
            }
        </LatestSectionParentStyled>
    </div>
}


export default LatestBlog
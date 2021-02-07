import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import React from 'react'
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
import { letterLimit } from '/@/functions/functions'


const CardItemLabel = ({ col = 3, index = null }) => {

    return <LatestSectionItemLabel className="align-self-center" col={col} index={index}>
        <LatestSectionH3Styled className="text-muted">
            Derniers
        </LatestSectionH3Styled>

        <LatestSectionSpanStyled>
            <InertiaLink
                preserveScroll
                className="text-secondary text-decoration-underline"
                href={route("guest.blog").toString()}>
                Blogs
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

const LatestSectionParentBlogStyled = styled(LatestSectionParentStyled)`
    min-height: 226px !important;
`


const LatestSectionItemBlogData = styled(LatestSectionItemData)`
    margin-top: 35.5px;
    margin-bottom: 35.5px;
`


const CardItemData = ({ col = 3, blog, showOnlySm = false, showOnlyMd = false, canShowInMd = false, index = null }) => {
    return <LatestSectionItemBlogData
        col={col}
        index={index}
        showOnlySm={showOnlySm}
        showOnlyMd={showOnlyMd}
        canShowInMd={canShowInMd}>

        <CardItemContainer border={true} cardClass="p-0 bg-transparent mt-2 h-100" bodyClass="p-3">
            <SpanDateStyled>
                {blog.date}
            </SpanDateStyled>

            <TextMuted>
                <H5TitleLink href={blog.route} className="my-2 h5">
                    {letterLimit(blog.title, 55)}
                </H5TitleLink>
            </TextMuted>

            <SpanDescriptionStyled className="desc text-muted">
                {letterLimit(blog.content, 245)}
            </SpanDescriptionStyled>

        </CardItemContainer>
    </LatestSectionItemBlogData>
}


const LatestBlog = () => {
    // @ts-ignore
    const { blogs } = usePage().props

    return <div className="container-fluid">
        <LatestSectionParentBlogStyled data-aos="fade-up" className="row justify-content-center pb-3">
            {
                [null, ...blogs]
                    .map((blog, i) => {
                        const col = blogs.length > 0 && blogs.length < 3 ? 4 : 3
                        return i === 0 ?
                            <CardItemLabel key={i} col={col} index={i + 1} /> :
                            <CardItemData
                                key={blog.id}
                                index={i + 1}
                                canShowInMd={i == 1}
                                showOnlyMd={i == 2}
                                showOnlySm={i == 3}
                                col={col}
                                blog={blog} />
                    })
            }
        </LatestSectionParentBlogStyled>
    </div>
}


export default LatestBlog
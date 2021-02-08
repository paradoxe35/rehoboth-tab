import { Inertia } from "@inertiajs/inertia";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import React, { useRef } from "react";
import styled from "styled-components";
import { LaravelPagination } from "/@/components/Pagination";
import Card from "/@/components/Card";
import H5TitleLink from "/@/components/H5TitleLink";
import ImageThumbnail from "/@/components/ImageThumbnail";
import NoContainerPadding from "/@/components/NoContainerPadding";
import { SpanDateStyled } from "/@/components/StyledComponents";
import TextMuted from "/@/components/TextMuted";
import { letterLimit } from "/@/functions/functions";
import Hero from "/@/layouts/Hero/Hero";
import { useListDataPaginator } from "/@/utils/hooks";


const CatogoriesContainer = styled(NoContainerPadding)`
    background-color: rgba(255, 253, 253, 0.856);
    height: auto;
`

const CardItemContainer = styled(Card)`
    transition: .5s;
    &:hover {
        border: solid 1px var(--bs-secondary) !important;
    }
`

const SpanDescriptionStyled = styled.span`
    font-size: 12px;
`

const BlogItem = ({ blog }) => {
    return <CardItemContainer border={true} cardClass="p-0 bg-transparent mt-2 mb-5" bodyClass="p-3">
        <InertiaLink href={blog.route}>
            <ImageThumbnail image={blog.image} height="100%" />
        </InertiaLink>
        <div className="d-flex justify-content-between mt-3">
            <SpanDateStyled>
                {blog.date}
            </SpanDateStyled>
        </div>

        <TextMuted>
            <H5TitleLink href={blog.route} className="my-2 h5">
                {blog.title}
            </H5TitleLink>
        </TextMuted>

        <SpanDescriptionStyled className="desc text-muted">
            {letterLimit(blog.content, 245)}
        </SpanDescriptionStyled>
    </CardItemContainer>
}


const Blog = () => {
    // @ts-ignore
    const { categories, blogs, category } = usePage().props
    const categoryRef = useRef(category)

    categoryRef.current = category

    const { listData, onPageChange } = useListDataPaginator(blogs, onClickPagination)

    function onClickPagination(page) {
        const ctg = categoryRef.current;
        Inertia.get(
            route('guest.blog', { page, ...(ctg ? { category: ctg } : {}) }).toString()
        )
    }

    const onChangeCategory = function ({ target: { value } }) {
        Inertia.get(route('guest.blog', { category: value }).toString())
    }

    return <Hero title={"Blog"} heroClass={null}>
        <div className="container-fluid">
            <CatogoriesContainer>
                <div className="container">
                    <div className="d-flex justify-content-end py-5 align-items-center">
                        <div>
                            <select
                                onChange={onChangeCategory}
                                className="form-select"
                                style={{ paddingRight: "2.54rem" }}
                                aria-label="Default select example">
                                {
                                    [null, ...(categories || [])].map(c => {
                                        return c === null ?
                                            <option selected={category == null}>Catégories</option> :
                                            <option key={c.id} selected={category == c.id} value={c.id}>{c.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </CatogoriesContainer>

            <div className="pt-5">
                <div className="row justify-content-center mb-3">
                    <div className="col-lg-5 col-md-8">
                        {(blogs.data || []).map(blog => <BlogItem key={blog.id} blog={blog} />)}
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <LaravelPagination listData={listData} getDataPaginator={onPageChange} />
                </div>
            </div>
        </div>
    </Hero>
}

export default Blog;
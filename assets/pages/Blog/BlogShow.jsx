import { InertiaLink } from '@inertiajs/inertia-react'
import React, { useEffect, useRef } from 'react'
import OpenShareButton from '/@/components/OpenShareButton'
import { capitalize } from '/@/functions/functions'
import { convertToHtml } from '/@/functions/jsonToHtml'
import Hero from '/@/layouts/Hero/Hero'
import FetchProfile from '/@/views/FetchProfile'


const BlogShow = ({ blog: { data: blog }, comment }) => {
    const commentRef = useRef(null)

    useEffect(() => {
        if (commentRef.current) {
            commentRef.current.appendChild(document.createRange().createContextualFragment(comment))
        }
    }, [])

    return <Hero bgColor={'rgba(5, 13, 24, 0.616)'} title={`Blog - ${blog.title}`} imageSrc={blog.image.public_path}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 py-4 mb-5">
                    <p className="mb-3 text-sm">
                        <b>{blog.description}</b>
                    </p>

                    <div className="acticle-blog"
                        dangerouslySetInnerHTML={{ __html: convertToHtml(JSON.parse(blog.content).blocks) }} />
                    <hr />
                    <div className="py-1 text-muted text-xs">
                        Posté en {blog.date} {blog?.category ? (
                            <> - <InertiaLink href={route('guest.blog', { category: blog?.category.id }).toString()}>{blog?.category.name}</InertiaLink></>
                        ) : ''} - Par <FetchProfile name={capitalize(blog.author)} />
                    </div>
                    <div className="mt-2">
                        <OpenShareButton title="Blog" text={blog.title} />
                    </div>

                    <div className="mt-4" ref={commentRef} />
                </div>
            </div>
        </div>
    </Hero>
}

export default BlogShow
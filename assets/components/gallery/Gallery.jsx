import { useCallback, useEffect, useRef, useState } from "react"
import { ApiRequestAxios } from "/@/api/axios"
import { useListDataPaginator } from "/@/utils/hooks"
import React from 'react'
import { ContentMasonrySimpleWrapper } from "../ContentMasonryWrapper"


const trueArr = new Array(5).fill(true)

export const useImagesGalleryState = (routeName, initialValue = null) => {
    const [images, setImages] = useState([])
    const [group, setGroup] = useState("all")

    const {
        listData,
        setListData,
        onPageChange: getPaginatorChange,
    } = useListDataPaginator(null, onLoadNextItems)

    const imagesRef = useRef(trueArr)
    const groupRef = useRef(group)

    groupRef.current = group

    useEffect(() => {
        if (initialValue) {
            setListData(initialValue)
            setImages(initialValue.data)
            imagesRef.current = initialValue.data
            return
        }
        ApiRequestAxios(route(routeName).toString())
            .then(({ data: pdata }) => {
                setListData(pdata)
                setImages(pdata.data)
                imagesRef.current = pdata.data
            })
    }, [])


    const prependImages = useCallback((imgs) => {
        imagesRef.current.push(...imgs)
        setImages(im => [
            ...(groupRef.current === "all" ? imgs : imgs.filter(i => i.imageable == group)),
            ...im,
        ])
    }, [imagesRef, setImages, group])

    const removeImage = useCallback((img) => {
        imagesRef.current = imagesRef.current.filter(i => i.id != img.id)
        setImages(im => im.filter(i => i.id != img.id))
    }, [imagesRef, setImages])

    function onLoadNextItems(page) {
        setImages(im => [...im, ...trueArr])

        ApiRequestAxios(route(routeName, { page }).toString())
            .then(({ data: pdata }) => {
                imagesRef.current.push(...pdata.data)
                setListData(pdata)
            })
    }

    useEffect(() => {
        switch (group) {
            case 'all':
                setImages(imagesRef.current)
                break;
            default:
                setImages(imagesRef.current.filter(i => i.imageable == group))
                break;
        }
    }, [group, listData])

    return { images, setGroup, prependImages, listData, getPaginatorChange, removeImage, trueArr, group }
}

export const LoadMoreGalleryButton = ({ listData, getPaginatorChange }) => {

    const handleClick = () => {
        const { links, meta } = listData
        links?.next && getPaginatorChange({ page: meta.current_page + 1 })
    }

    return <>
        {listData?.links?.next && (
            <button
                className="btn btn-primary text-center text-xs text-white btn-sm"
                onClick={handleClick}
                type="button">
                <span className="loading">• • •</span>
                <span className="visually-hidden">Charge plus</span>
            </button>
        )}
    </>
}

export const ContentGallery = ({ images = [], children }) => {
    return <ContentMasonrySimpleWrapper>
        {images.map((img, i) => {
            const data = { index: i, img }
            if (typeof img === 'boolean') {
                return children(true, data)
            } else {
                return children(false, data)
            }
        })}

        {!images.length && <div className="py-5" />}
    </ContentMasonrySimpleWrapper>
}

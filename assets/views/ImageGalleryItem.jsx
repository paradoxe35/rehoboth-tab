import { ItemFolio, ItemFolioText, ItemFolioThumb } from '/@/components/ContentMasonryWrapper'
import ImageThumbnail from '/@/components/ImageThumbnail'
import { letterLimit } from '/@/functions/functions'
import React from 'react'


const ImageGalleryItem = ({ img, onClick = null, component = null }) => {

    const title = img?.gallery?.title || img.title
    const description = img.description || img?.gallery?.description

    return <ItemFolio key={img.id}>
        <ItemFolioThumb>
            {
                component ||
                <a href={img.public_path} onClick={e => {
                    e.preventDefault()
                    onClick && onClick()
                }}>
                    <ImageThumbnail image={img} title={title} />
                </a>
            }
        </ItemFolioThumb>
        <ItemFolioText title={(
            <span title={title} className="text-xs">
                {letterLimit(title, 15)}
            </span>
        )} cat={(
            <span title={description}>{letterLimit(description, 15)}</span>
        )} />
    </ItemFolio>
}

export default ImageGalleryItem
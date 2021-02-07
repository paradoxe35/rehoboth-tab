import React from 'react';
import { useMemo } from 'react';
import { PhotoSwipe } from 'react-pswp';
import 'react-pswp/dist/index.css';


const PhotoPswp = ({ images = [], setIndex, setOpen, index, open }) => {

    const pswpContainer = useMemo(() => images.map((img, i) => ({
        uid: i,
        src: img.public_path,
        msrc: img.public_path,
        w: img.width,
        h: img.height,
        title: img?.gallery?.title || img.title || img.caption,
        description: img.description || img?.gallery?.description,
    })), [images])

    return <PhotoSwipe
        container={pswpContainer}
        onIndexChange={setIndex}
        onOpenChange={setOpen}
        index={index}
        open={open}
        theme={{
            foreground: '#fff',
            background: 'rgba(0, 0, 0, 0.8)',
        }}
    />
}


export default PhotoPswp
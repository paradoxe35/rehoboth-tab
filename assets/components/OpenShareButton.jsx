import React from 'react'
import { FiShare2 } from 'react-icons/fi'
import { useOpenShare } from '../utils/hooks'
import Button from './admin/Button'


const OpenShareButton = ({ title, text, url = null }) => {
    const { loading, setOption } = useOpenShare({
        title,
        text,
        url: url || location.href
    })

    return <Button
        onClick={() => setOption(e => e + 1)}
        color="dark"
        className="text-sm btn-sm"
        loading={loading}
        text={
            <>
                <FiShare2 />{" "}
                <span>Partager</span>
            </>
        } />
}

export default OpenShareButton
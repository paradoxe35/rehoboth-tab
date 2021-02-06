import React, { useEffect, useRef, useState } from 'react'
import { Popover } from 'react-tiny-popover'

const FetchProfile = ({ name }) => {
    const [profile, setProfile] = useState(null)

    return <a href="javascript:;">{name}</a>
}

export default FetchProfile
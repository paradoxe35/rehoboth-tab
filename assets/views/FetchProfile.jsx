import React, { useEffect, useRef, useState } from 'react'
import { Popover, ArrowContainer } from 'react-tiny-popover'
import styled from 'styled-components'
import { ApiRequestAxios } from '../api/axios'
import ImageThumbnail from '../components/ImageThumbnail'
import Spinner from '../components/Spinner'


const Container = styled.div`
    text-align: start;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-break: normal;
    word-spacing: normal;
    white-space: normal;
    line-break: auto;
    font-size: .875rem;
    max-width: 276px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    background-color: var(--bs-light);
    background-clip: padding-box;
    overflow: hidden;
    border-radius: .3rem;
    .popover-header {
        padding: .5rem 1rem;
        margin-bottom: 0;
        font-size: 1rem;
        background-color: #f0f0f0;
        border-bottom: 1px solid #d8d8d8;
        border-top-left-radius: calc(.3rem - 1px);
        border-top-right-radius: calc(.3rem - 1px);
        margin-top: 0;
        font-weight: 500;
        line-height: 1.2;
    }
    .popover-body {
        padding: 1rem 1rem;
        overflow: hidden;
        color: #212529;
    }
`

const FetchProfile = ({ name }) => {
    const [profile, setProfile] = useState(null)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    useEffect(() => {
        if (profile || !isPopoverOpen) return

        ApiRequestAxios(route('guest.app.profiles', { name }))
            .then(({ data: { profile } }) => setProfile({ data: profile }))
            .catch(() => setProfile(undefined))
    }, [isPopoverOpen])

    const content = ({ position, childRect, popoverRect }) => {
        return <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={'#c7ae68'}
            arrowSize={10}
            arrowStyle={{ opacity: "1" }}
            className='popover-arrow-container'
            arrowClassName='popover-arrow'>
            <Container className="shadow-lg">
                <h3 className="popover-header">{name}</h3>
                <div className="popover-body">
                    {profile === null && <Spinner sm="sm" />}
                    {profile?.data && (
                        <>
                            <ImageThumbnail image={profile.data.image} />
                            {profile.data.phone && <div className="text-sm text-muted my-1">
                                Phone: <a href={`tel:${profile.data.phone}`}>{profile.data.phone}</a>
                            </div>}
                            {profile.data.email && <div className="text-sm text-muted my-1">
                                Email: <a href={`mailto:${profile.data.email}`}>{profile.data.email}</a>
                            </div>}
                            {profile.data.description && <div className="text-sm text-muted my-1">{profile.data.description}</div>}
                        </>
                    )}
                </div>
            </Container>
        </ArrowContainer>
    }

    return <Popover
        isOpen={isPopoverOpen}
        positions={['top', 'right', 'left', 'bottom']}
        containerStyle={{ zIndex: "1030" }}
        padding={10}
        onClickOutside={() => setIsPopoverOpen(false)}
        content={content}>
        <a href="javascript:;" onClick={() => {
            if (!(profile && !profile.data)) {
                setIsPopoverOpen(true)
            }
        }}>{name}</a>
    </Popover>

}

export default FetchProfile
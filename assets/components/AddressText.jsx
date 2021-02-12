import React from 'react'

const AddressText = ({ address, br = false }) => {
    if (br) {
        return <>
            {address?.address && <><span>{address?.address}</span></>}
            {address?.venue && <><span> {address?.venue}</span><br /></>}
            {address?.city && <><span> {address?.city}</span><br /></>}
            {address?.state && <><span> {address?.state}</span><br /></>}
            {address?.country && <><span> {address?.country}</span><br /></>}
        </>
    } else {
        return <>
            {address?.address} {address?.venue}{address?.venue && address?.address ? ',' : ''} {address?.city} {address?.state} {address?.country}
        </>
    }
}

export default AddressText
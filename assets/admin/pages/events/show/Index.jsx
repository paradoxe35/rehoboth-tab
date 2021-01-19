import "/@/utils/devtool"
import React, { useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'


const Main = () => {

    return <>
        <div className="row">
            <div className="col-lg-8 pr-lg-2">
                fdsfdsf fgdg
            </div>
        </div>
    </>
}

const instance = (element) => {
    render(<Main />, element)
    return () => unmountComponentAtNode(element)
}
export default instance
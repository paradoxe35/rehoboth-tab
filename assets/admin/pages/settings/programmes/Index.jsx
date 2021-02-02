import "/@/utils/devtool"
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Card from "/@/components/Card"
import { ApiRequest } from "/@/api/api"
import { FormControl } from "../../events/create/FormControl"


const Main = () => {
    return <Card>
        programmes
    </Card>
}

const instance = (element) => {
    render(<Main />, element)
    return () => unmountComponentAtNode(element)
}

export default instance
import "/@/utils/devtool"
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Tab, Tabs } from "/@/components/admin/Tabs"


const Main = () => {

    return <Tabs>
        <Tab title="Afficher tout">

        </Tab>
        <Tab title="Événement">

        </Tab>
        <Tab title="Blog">

        </Tab>
        <Tab title="Galerie">

        </Tab>
    </Tabs>
}

const instance = (element) => {
    render(<Main />, element)
    return () => unmountComponentAtNode(element)
}
export default instance
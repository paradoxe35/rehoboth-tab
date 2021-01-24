import "/@/utils/devtool"
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Tab, Tabs } from "/@/components/admin/Tabs"
import Details from './Tabs/Details'
import Tickets from './Tabs/Tickets'
import Schedules from './Tabs/Schedules'
import Photos from './Tabs/Photos'
import OtherInfo from './Tabs/OtherInfo'
import { resetEventDataForm } from "../create/DatasForm"


const Main = () => {

    return <>
        <Tabs>
            <Tab id="details" active={true} title="Détails">
                <Details />
            </Tab>

            <Tab title="Tickets">
                <Tickets />
            </Tab>

            <Tab title="Programmes">
                <Schedules />
            </Tab>

            <Tab title="Photos">
                <Photos />
            </Tab>

            <Tab title="Autre Info">
                <OtherInfo />
            </Tab>
        </Tabs>
    </>
}

const instance = (element) => {
    render(<Main />, element)
    return () => {
        resetEventDataForm()
        unmountComponentAtNode(element)
    }
}
export default instance
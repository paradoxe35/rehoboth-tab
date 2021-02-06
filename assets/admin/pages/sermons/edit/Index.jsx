import "/@/utils/devtool"
import React, { useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Tab, Tabs } from "/@/components/admin/Tabs"
import Card from "/@/components/Card"
import H5 from "../../events/create/H5"
import Button from "/@/components/admin/Button"
import ImageThumbnail from "/@/components/ImageThumbnail"

let image = null;
let video = null;
let audios = null;
let documents = null;
let sermon = null;

const Alert = ({ children }) => <div className="alert alert-info" role="alert">{children}</div>


const ImageCover = () => {
    const [img, setImg] = useState(image)
    const [loading, setLoading] = useState(false)


    return <div className="row">
        <div className="col-lg-5 mb-3">
            {img ? (
                <>
                    <div className="my-2">
                        <Button text="Supprimer" color="danger" className="text-sm" loading={loading} />
                    </div>
                    <ImageThumbnail image={img} title={sermon.subject} />
                </>
            ) : <Alert>Aucune image enregistrée</Alert>}
        </div>
    </div>
}

const Video = () => {
    return <>

    </>
}

const Audios = () => {
    return <>
    </>
}

const Documents = () => {
    return <>
    </>
}

const Main = () => {
    // @ts-ignore
    sermon = window.$sermon
    image = sermon?.image
    video = sermon?.video
    documents = sermon?.documents
    audios = sermon?.audios

    return <>
        <Card title={<H5 text="Editer Media" />} bodyClass="bg-light">
            <Tabs>
                <Tab active={true} title="Image couverture">
                    <ImageCover />
                </Tab>

                <Tab title="Video">
                    <Video />
                </Tab>

                <Tab title="Audios">
                    <Audios />
                </Tab>

                <Tab title="Documents">
                    <Documents />
                </Tab>
            </Tabs>
        </Card>
    </>
}

const instance = (element) => {
    render(<Main />, element)
    return () => {
        unmountComponentAtNode(element)
    }
}
export default instance
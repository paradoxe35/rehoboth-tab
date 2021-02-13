import React from 'react'
import styled from 'styled-components'


const CompositionSource = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 3001;
    display: none;
    text-align: left;
    color: #000;
    box-sizing: border-box;
    overflow-y: scroll;
    padding-left: 50%;
    padding-right: 0px;
    @media (max-width: 480px) {
        &{
            -webkit-overflow-scrolling: touch;
        }
    }
    @media (max-width: 992px) {
        &{
            padding-left: 0;
            padding-top: 500px;
            margin-top: 0;
        }
    }
    @media (max-height: 570px) and (max-width: 992px) {
        &{
            padding-top: 430px;
        }
    }
`

const CompositionSourceContainer = styled.div`
    background-color: #fff;
    transform-origin: 100% 0;
    padding-bottom: 20px;
    overflow-x: hidden;
    padding-bottom: 20px;
    overflow-x: hidden;
    padding-top: 100px;
    min-height: 100vh;
    @media (max-width: 992px) {
        & {
            padding-top: 0;
            margin-top: 0;
        }
    }
    @media (max-width: 480px) {
        & {
            padding-top: 20px;
        }
    }
`


const RegistrationContent = ({ event, backButton }) => {
    // console.log(event);
    return <div className="row">
        <div className="col-lg-6 vh-100">
            <div className="d-flex h-100 align-items-center justify-content-center">
                <h1 className="ml3">{event.name}</h1>
            </div>
        </div>
        <CompositionSource className="col-lg-6 composition-source pr-0" style={{ display: "block" }}>
            {backButton}
            <CompositionSourceContainer className="composition-source-container" style={{ transform: "scaleX(1)", display: "block" }}>
                    <div className="my-4 composition-source-text">demo demode mode</div>
                    <div className="my-4 composition-source-text">demo demode mode</div>
                    <div className="my-4 composition-source-text">demo demode mode</div>
                    <div className="my-4 composition-source-text">demo demode mode</div>
                    <div className="my-4 composition-source-text">demo demode mode</div>
                    <div className="my-4 composition-source-text">demo demode mode</div>
                    <div className="my-4 composition-source-text">demo demode mode</div>
                    <div className="my-4 composition-source-text">demo demode mode</div>
                    <div className="my-4 composition-source-text">demo demode mode</div>
                    <div className="my-4 composition-source-text">demo demode mode</div>
                    <div className="my-4 composition-source-text">demo demode mode</div>
            </CompositionSourceContainer>
        </CompositionSource>
    </div>
}


export default RegistrationContent
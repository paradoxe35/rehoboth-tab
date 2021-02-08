import React from "react";
import styled from "styled-components";
import NoContainerPadding from "/@/components/NoContainerPadding";
import Hero from "/@/layouts/Hero/Hero";


const CatogoriesContainer = styled(NoContainerPadding)`
    background-color: rgba(255, 253, 253, 0.856);
    height: auto;
`

const Blog = () => {

    return <Hero title={"Blog"}>
        <div className="container-fluid">
            <CatogoriesContainer>

            </CatogoriesContainer>
        </div>
    </Hero>
}

export default Blog;
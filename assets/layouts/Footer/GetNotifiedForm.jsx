import React from 'react'
import styled from 'styled-components'


const SubscribeFormStyled = styled.div`
    margin: 0;
    padding: 0;
    position: relative;
`

const FormGroup = styled.form`
    width: 100%;
`

const InputParentText = styled.div`
    padding-right: 0;
`

const InputParentSubmit = styled.div`
   padding-left: 0;
`

const InputText = styled.input`
    border-radius: 0px;
    &:focus{
        box-shadow: none;
    }
`
const Inputubmit = styled.button`
    border-radius: 0px;
`


const GetNotifiedForm = ({ t }) => {

    return <SubscribeFormStyled>
        <FormGroup noValidate={true} className="row g-3" >
            <InputParentText className="col">
                <InputText type="email" className="form-control" placeholder={"Adresse e-mail"} />
            </InputParentText>
            <InputParentSubmit className="col mb-3">
                <Inputubmit type="submit" className="btn btn-primary text-white ">
                    Souscrire
                </Inputubmit>
            </InputParentSubmit>
        </FormGroup>
    </SubscribeFormStyled>
}


export default GetNotifiedForm
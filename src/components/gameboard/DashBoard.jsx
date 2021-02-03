import React from 'react'
import { Container } from 'react-bootstrap'
import CenteredContainer from '../authentication/CenteredContainer'
import NavBar from './NavBar'
import StageArea from './StageArea'

export default function DashBoard() {
    return (
        <React.Fragment>
            <div style={{overflowY:"hidden"}}>
                <NavBar/>
                <Container>
                    <StageArea/>
                </Container>
            </div>
        </React.Fragment>
    )
}

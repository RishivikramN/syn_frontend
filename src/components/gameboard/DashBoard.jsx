import React,{useState,useEffect} from 'react'
import {useAuth} from "../../contexts/AuthContext"
import { Container } from 'react-bootstrap'
import {useGameDetail} from "../../contexts/GameContext";
import NavBar from './NavBar'
import StageArea from './StageArea'

export default function DashBoard() {
    const {currentUser} = useAuth();
    const {getHighScore,highScore,gameCount} = useGameDetail();

    useEffect(()=>{
        getHighScore(currentUser.emailId);
    },[]);

    return (
        <React.Fragment>
            <div style={{overflowY:"hidden"}}>
                <NavBar DashBoardScore={highScore} GameCount={gameCount}/>
                <Container>
                    <StageArea/>
                </Container>
            </div>
        </React.Fragment>
    )
}

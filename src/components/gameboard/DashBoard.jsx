import React,{useState,useEffect} from 'react'
import {useAuth} from "../../contexts/AuthContext"
import { Container } from 'react-bootstrap'
import {useGameDetail} from "../../contexts/GameContext";
import NavBar from './NavBar'
import StageArea from './StageArea'

export default function DashBoard() {
    const {currentUser} = useAuth();
    const {getHighScore,highScore,gameCount} = useGameDetail();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        getHighScore(currentUser.emailId);
        setTimeout(()=>{
            setLoading(false);
        },1000);
    },[]);

    return (
        <React.Fragment>
            
            <div style={{overflowY:"hidden"}}>
            {    
            loading ?
            <div style={{marginLeft:"750px",marginTop:"300px"}} class="spinner-border text-primary" role="status"/>
            :
                <React.Fragment>
                    <NavBar DashBoardScore={highScore} GameCount={gameCount}/>
                    <Container>
                        <StageArea/>
                    </Container>
                </React.Fragment>
            }
            </div>
        </React.Fragment>
    )
}

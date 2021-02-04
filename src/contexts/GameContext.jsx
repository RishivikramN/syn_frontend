import React, { useContext, useState } from 'react';
import axios from "axios";
import { gameDetailEndpoint,highScoreEndpoint,gameCountEndpoint } from "../Endpoints";
import {useAuth} from "./AuthContext";

const GameDetailContext = React.createContext();

export function useGameDetail(){
    return useContext(GameDetailContext);
}

export function GameDetailProvider({children}){
    const [highScore,setHighScore] = useState(0);
    const [gameCount,setGameCount] = useState(0);
    const {token} = useAuth();

    const addGameDetailLogs = async (email,score) => {
        const JSONPayload = {
            emailId : email,
            score,
            date: new Date().toDateString()
        }
        
        const response = await axios.post(gameDetailEndpoint, JSONPayload,{headers:{
            'x-auth-token' : token
        }});
    }

    const getHighScore = async (email)=>{
        const JSONPayload = {
            emailId : email
        }

        const response = await axios.post(highScoreEndpoint, JSONPayload,{headers:{
            'x-auth-token' : token
        }});
            
        setHighScore(response.data.score);
    }

    const getGameCount = async(email) => {
        const JSONPayload={
            emailId : email
        }
        const response = await axios.post(gameCountEndpoint, JSONPayload,{headers:{
            'x-auth-token' : token
        }});

        setGameCount(10 - response.data.count);
    }

    const updateGameCount = (count) => {
        setGameCount(gameCount + count);
    }

    const updateHighScore = (score) => {
        if(score > highScore)
            setHighScore(score);
    }

    const value={
        addGameDetailLogs,
        getHighScore,
        highScore,
        updateHighScore,
        gameCount,
        getGameCount,
        updateGameCount
    }
    return(
        <GameDetailContext.Provider value={value}>
            {children}
        </GameDetailContext.Provider>
    )

}
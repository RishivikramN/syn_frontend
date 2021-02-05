import React,{useState,useEffect,useRef} from 'react'
import {Button} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext"
import {useGameDetail} from "../../contexts/GameContext"

//Global Variables
var myGameArea={};
var myGamePiece={};
var myObstacles = [];
var myscore={};

export default function StageArea() { 
    const canvasRef = useRef(null);
    const restartRef = useRef(null);
    const startRef = useRef(null);

    const {addGameDetailLogs,updateHighScore,updateGameCount,gameCount}  = useGameDetail();
    const {currentUser} = useAuth();

    const [isCrashed,setIsCrashed] = useState(false);
    const [score,setScore] = useState(0);
    const [isGameStarted,setIsGameStarted] = useState(false);

    const handleKeyDown = (event)=>{
        switch(event.key){
            case 'ArrowUp':
                moveup();
                break;
            case 'ArrowDown':
                movedown();
                break;
            case 'ArrowRight':
                moveright();
                break;
            case 'ArrowLeft':
                moveleft();
                break;
        }
    }

    const handleKeyUp = (event)=>{
        clearmove();
    }

    const handleStartGame = ()=>{
        setIsGameStarted(true);
        startGame(canvasRef,restartRef);
    };

    const handleRestartGame = ()=>{
        setIsGameStarted(true);
        restartGame(canvasRef,restartRef);
    }

    useEffect(()=>{
        //Player
        window.addEventListener('keydown',handleKeyDown);
        window.addEventListener('keyup',handleKeyUp);

        return ()=>{
            window.removeEventListener('keydown',handleKeyDown);
            window.removeEventListener('keyup',handleKeyUp);
            if(isGameStarted)
                clearGameArea();
        }

    },[]);

    function startGame(canvasRef,restartRef){
        myGameArea = new gamearea(canvasRef,restartRef);
        myGamePiece = new component(30, 30, "red", 10, 75);
        myscore = new component("0px", "Consolas", "black", 220, 25, "text");
        myGameArea.start();
   }

   function restartGame(canvasRef,restartRef) {
    //document.getElementById("myfilter").style.display = "none";
    //document.getElementById("myrestartbutton").style.display = "none";
    myGameArea.stop();
    myGameArea.clear();
    myGameArea = {};
    myGamePiece = {};
    myObstacles = [];
    myscore = {};
    //document.getElementById("canvascontainer").innerHTML = "";
    startGame(canvasRef,restartRef)
  }

function gamearea(canvasRef,restartRef) {
    this.canvas = canvasRef.current;
    this.canvas.width = 800;
    this.canvas.height = 500;    
    this.context = this.canvas.getContext("2d");
    this.pause = false;
    this.frameNo = 0;
    this.start = function() {
      this.interval = setInterval(()=>{updateGameArea(restartRef)}, 20);
    }
    this.stop = function() {
      clearInterval(this.interval);
      this.pause = true;
    }
    this.clear = function(){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  function component(width, height, color, x, y, type) {

    this.type = type;
    if (type === "text") {
      this.text = color;
    }
    this.score = 0;    
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
      var ctx = myGameArea.context;
      if (this.type === "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
    this.crashWith = function(otherobj) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      setIsCrashed(crash);
      if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
        crash = false;
        setIsCrashed(crash);
      }
      return crash;
    }
  }

    function updateGameArea(restartRef) {
        var x, y, min, max, height, gap;
        for (let i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                myGameArea.stop();
                addGameDetailLogs(currentUser.emailId,myscore.score);
                updateHighScore(myscore.score);
                updateGameCount(-1);
                return;
            } 
        }
        if (myGameArea.pause === false) {
            myGameArea.clear();
            myGameArea.frameNo += 1;
            myscore.score +=1;      
            setScore(myscore.score);  
            if (myGameArea.frameNo === 1 || everyinterval(150)) {
                x = myGameArea.canvas.width;
                y = myGameArea.canvas.height - 100;
                min = 20;
                max = 100;
                height = Math.floor(Math.random()*(max-min+1)+min);
                min = 50;
                max = 100;
                gap = Math.floor(Math.random()*(max-min+1)+min);
                myObstacles.push(new component(10, height, "green", x, 0));
                myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
            }
            for (let i = 0; i < myObstacles.length; i += 1) {
                myObstacles[i].x += -1;
                myObstacles[i].update();
            }       
            myscore.update();
            myGamePiece.x += myGamePiece.speedX;
            myGamePiece.y += myGamePiece.speedY;    
            myGamePiece.update();
        }
    }

    function everyinterval(n) {
        if ((myGameArea.frameNo / n) % 1 === 0) {return true;}
        return false;
    }

    function moveup() {
        myGamePiece.speedY = -1; 
    }

    function movedown() {
        myGamePiece.speedY = 1; 
    }

    function moveleft() {
        myGamePiece.speedX = -1; 
    }

    function moveright() {
        myGamePiece.speedX = 1; 
    }

    function clearmove() {
        myGamePiece.speedX = 0; 
        myGamePiece.speedY = 0; 
    }

    return (
        <React.Fragment>
            <div className="d-flex">
                <div>{(gameCount>0) &&<h2 className="mt-3">Score: {score}</h2>}</div>
                <div className="ml-3 mt-3">{isCrashed && <h2 style={{color:"red"}}>Game Over !!</h2>}</div>
            </div>
            
            {(gameCount>0) && <canvas className="mt-3" style={{backgroundColor:"white",width:800,height:500}} ref={canvasRef}/>}
            <div className="d-flex mt-5">
                {isCrashed && (gameCount > 0) && <Button ref={restartRef} onClick={handleRestartGame}>
                    Restart 
                </Button>}
                {!isCrashed && !isGameStarted && (gameCount > 0) && <Button ref={startRef} onClick={handleStartGame}>
                    Start
                </Button>}
                {(gameCount<=0)?<h2>Attempt is over! come back tomorrow</h2> : null}
            </div>
        </React.Fragment>
    )
}



export function clearGameArea(){
    myGameArea.stop();
    myGameArea.clear();
    myGameArea = {};
    myGamePiece = {};
    myObstacles = [];
    myscore = {};
  }
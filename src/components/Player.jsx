import socket from "../socket";
import { useContext } from "react";
import {GameContext} from '../AppContext';
import { Board } from "./Board";
const Player = () => {
    const {gameStarted} = useContext(GameContext)
    return gameStarted ? <Board height={10} width={10}/>:<div>I am client of room {socket.joinedRoom}</div>
}

export default Player;
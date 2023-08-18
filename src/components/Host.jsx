import { Board } from "./Board";
import socket from "../socket";
import {    GameContext} from '../AppContext'
import { useContext } from "react";
import events from "../events";

const Host = () => {
    const {playerJoined, gameStarted} = useContext(GameContext);
    const startGame = () => {
        socket.emit(events.start_game);
    }
    return <div>
        {gameStarted ? <Board height={10} width={10} /> : <div>I am the host {socket.joinedRoom}, {socket.playerName}
                                            <div><button onClick={startGame} disabled={!playerJoined}>Play</button></div>
                                        </ div> }
    </div>
}

export default Host;
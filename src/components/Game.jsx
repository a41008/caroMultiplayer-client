import HostSelection from "./HostSelection";
import Lobby from "./Lobby";
import { GameContext } from "../AppContext";
import { useContext } from "react";
const Game = () => {
    const {isHost} = useContext(GameContext)
    return (
        <div className="App">
            {isHost === 0 ? <HostSelection /> 
                        : <Lobby/>}
        </div>
    )
}

export default Game;
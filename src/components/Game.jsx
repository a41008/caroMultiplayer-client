import HostSelection from "./HostSelection";
import Lobby from "./Lobby";
import { GameContext } from "../AppContext";
import { useContext } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
const Game = () => {
    const {isHost} = useContext(GameContext)
    return (<div className="App-container">
        <Header/>
        <div className="App">
            {isHost === 0 ? <HostSelection /> 
                        : <Lobby/>}
        </div>
        <Footer/>
    </div>
    )
}

export default Game;
import Host from "./Host";
import {GameContext} from '../AppContext'
import { useContext } from "react";
import Player from "./Player";
const Lobby = () => {
    const {isHost} = useContext(GameContext);
    return <div className="lobby">
        {isHost === 1 ? <Host />
                    : <Player/>}
    </div>
}

export default Lobby;
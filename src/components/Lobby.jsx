import {GameContext} from '../AppContext'
import { useContext } from "react";
import socket from '../socket';
import {Board} from './Board';
import events from '../events';
import PlayerList from './PlayerList';
const Lobby = () => {
    const {isHost,gameStarted, playerJoined} = useContext(GameContext);
    const startGame = () => {
        socket.emit(events.start_game);
    }
    const onQuitLobby = () => {
        socket.emit('quit lobby');
    }
    return <div className="lobby">
        <div onClick={onQuitLobby}>Quit</div>
        { gameStarted ? <Board height={10} width={10} /> 
                        : isHost === 1 ? <div>
                            <PlayerList isHost={true} hostName={socket.playerName} playerName={playerJoined}/>
                            <div className='btn-container'><button className='btn-start' onClick={startGame} disabled={!playerJoined}>Play</button></div>
                        </div>
                        : <PlayerList isHost={false} hostName={socket.hostName} playerName={socket.playerName}/>
        }
    </div>
}

export default Lobby;
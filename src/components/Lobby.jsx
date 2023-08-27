import {GameContext} from '../AppContext'
import { useContext } from "react";
import socket from '../socket';
import {Board} from './Board';
import events from '../events';
import PlayerList from './PlayerList';
import backIcon from '../img/back_arrow_icon.svg'
const Lobby = () => {
    const {isHost,gameStarted, playerJoined} = useContext(GameContext);
    const startGame = () => {
        socket.emit(events.start_game);
    }
    const onQuitLobby = () => {
        socket.emit('quit lobby');
    }
    return <div className="lobby">
        <div className='btn-quit' onClick={onQuitLobby}><img className='icon-back' src={backIcon} alt=''/>Quit</div>
        {isHost === 1 ? <PlayerList isHost={true} hostName={socket.playerName} playerName={playerJoined}/> 
                      : <PlayerList isHost={false} hostName={socket.hostName} playerName={socket.playerName}/> }
        { gameStarted ? <Board height={20} width={20} /> 
                        : <div className='btn-container'><button className='btn-start' onClick={startGame} disabled={!playerJoined}>Play</button></div>
                        
        }
    </div>
}

export default Lobby;
import { useContext } from 'react'
import {GameContext} from '../AppContext'
import avt from '../img/avatar.svg'
import socket from '../socket';
const PlayerList = ({isHost, hostName, playerName}) => {
    const {playerJoined} = useContext(GameContext);
    return <div className="player-list">
        <div className="avatar">
            <img src={avt} alt='avatar'/>
            <p>{hostName}(host)</p>
        </div>
        {!isHost || playerJoined ? <div className='avatar'>
            <img src={avt} alt="avatar"/>
            <p>{playerName}</p>
        </div>: <div>Nhấn copy để lấy mã phòng <button onClick={() => navigator.clipboard.writeText(socket.joinedRoom)}>Copy</button></div> }
    </div>
}

export default PlayerList;
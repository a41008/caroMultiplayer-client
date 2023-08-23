import { useContext, useState } from "react";
import socket from "../socket"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {GameContext, DispatchContext} from '../AppContext'
import events from "../events";
const HostSelection = () => {
    
    const {nameSelected} = useContext(GameContext);
    const dispatch = useContext(DispatchContext);
    const [error, setError] = useState(null);
    const isRejected = !!error ;
    const navigate = useNavigate();
    
    const [roomID, setRoomID] = useState('');
    const onHost = () => {
        socket.emit('host room');

    }
    const onJoin = (roomID) => {
        socket.emit('join room', roomID)
    }

    useEffect(() => {
        if (!nameSelected) navigate('/');
        const onConnectError = ({roomID, err}) => {
            setError(err);
            setRoomID(()=> '')
            dispatch({
              type: 'set_is_host',
              value: 0
            })
          }
        socket.on(events.connect_error, onConnectError)
        return () => {
            socket.off(events.connect_error, onConnectError);
        }
    })
    return <div className="host-selection">
        <div className="form">
            <button onClick={onHost}>Host</button>
            <button onClick={() => onJoin(roomID)}>Join</button>
            <input type="text" placeholder="Host string" value={roomID} onChange={(e) => setRoomID(() => e.target.value)}/>
        </div>
        {isRejected ? <div className="error">Không thể tham gia phòng vì {error === 'full' ? 'phòng đã đầy' : 'phòng không tồn tại'}</div> : ''}
    </div>
}




export default HostSelection
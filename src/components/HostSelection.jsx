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
        <div className="host-selection__form">
            <button onClick={onHost}>Tạo phòng</button>
            <div className="form__join-room">
                <button onClick={() => onJoin(roomID)}>Tham gia</button>
                <input type="text" placeholder="Mã phòng" value={roomID} onChange={(e) => setRoomID(() => e.target.value)}/>
            </div>
        </div>
        {isRejected ? <div className="error">Không thể tham gia phòng vì {error === 'full' ? 'phòng đã đầy' : 'phòng không tồn tại'}</div> : ''}
    </div>
}




export default HostSelection
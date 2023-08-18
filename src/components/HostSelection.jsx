import { useContext, useState } from "react";
import socket from "../socket"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {GameContext, DispatchContext} from '../AppContext'
const HostSelection = (props) => {
    
    const {nameSelected} = useContext(GameContext);
    const dispatch = useContext(DispatchContext);

    const navigate = useNavigate();
    useEffect(() => {
        if (!nameSelected) navigate('/');
    })
    const [roomID, setRoomID] = useState('');
    const onHost = () => {
        socket.emit('host room');

    }
    const onJoin = (roomID) => {
        socket.emit('join room', roomID)
    }
    return <div className="host-selection">
        <button onClick={onHost}>Host</button>
        <button onClick={() => onJoin(roomID)}>Join</button>
        <input type="text" placeholder="Host string" value={roomID} onChange={(e) => setRoomID(() => e.target.value)}/>

    </div>
}




export default HostSelection
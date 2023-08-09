import { useState } from "react";
import socket from "../socket"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HostSelection = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!props.nameSelected) navigate('/');
    })
    const [roomID, setRoomID] = useState('');
    const onHost = () => {
        socket.emit('host room');
        props.setHost(1);
    }
    const onJoin = (roomID) => {
        socket.emit('join room', roomID)
        props.setHost(-1);
    }
    return <div className="host-selection">
        <button onClick={onHost}>Host</button>
        <button onClick={() => onJoin(roomID)}>Join</button>
        <input type="text" placeholder="Host string" value={roomID} onChange={(e) => setRoomID(() => e.target.value)}/>

    </div>
}




export default HostSelection
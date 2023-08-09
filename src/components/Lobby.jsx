import socket from "../socket";

const Lobby = (props) => {
    return <div className="lobby">
        {props.isHost === 1 ? <div>I am the host {socket.id}, {socket.playerName}</div> 
                    : <div>I am client of room {socket.joinedRoom}</div>}
    </div>
}

export default Lobby;
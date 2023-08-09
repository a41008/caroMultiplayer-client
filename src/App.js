import { useEffect, useState } from 'react';
import './App.css';
import socket from './socket';
import HostSelection from './components/HostSelection';
import NameSelection from './components/NameSelection';
import Lobby from './components/Lobby'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import events from './events'


function App() {
  // const [currentPlayer, setPlayer] = useState('X')
  const [isHost, setIsHost] = useState(0);
  const [nameSelected, setNameSelected] = useState(false);
  const [playerJoined, setPlayerJoined] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    socket.on(events.player_joined, (playerName) => {
      console.log(`Player ${playerName} joined`)
      setPlayerJoined(true)
    })

    socket.on(events.connect_error, ({roomID, err}) => {
      console.log(`Failed to connect to room ${roomID} : ${err}`);
      setIsHost(() => 0)
    })

    socket.on(events.room_connected, (hostName) => {
      console.log(hostName)
    })

    socket.on(events.host_disconnected, () => {
      setIsHost(0);
    })
    socket.on(events.player_disconnected, () => {
      setPlayerJoined(false);
    })
  }, [])
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<NameSelection setNameSelected={setNameSelected}/>}/>
      <Route path='/game' element={(<div className="App">
                                      {isHost === 0 ? <HostSelection setHost={setIsHost} nameSelected={nameSelected}/> 
                                                    : <Lobby isHost={isHost} playerJoined={playerJoined} gameStarted={gameStarted} setGameStarted={setGameStarted}/>}
                                    </div>
                                  )}/>
    </Routes>
  </BrowserRouter>
  
}

export default App;

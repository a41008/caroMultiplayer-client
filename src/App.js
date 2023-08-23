import { useEffect, useReducer } from 'react';
import './App.css';
import socket from './socket';
import NameSelection from './components/NameSelection';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import events from './events'
import Game from './components/Game';
import {DispatchContext, GameContext} from './AppContext'



const gameReducer = (state, action) => {
  switch (action.type) {
    case 'set_is_host' : {
      return {...state, isHost: action.value}
    }
    case 'set_name_selected' : {
      return {...state, nameSelected: action.value}
    }
    case 'set_player_joined' : {
      return {...state, playerJoined: action.value}
    }
    case 'set_game_started' : {
      return {...state, gameStarted: action.value, firstPlayer: action.id}
    }
    default:{
      return state
    }
  }
}


function App() {
  const [gameState, dispatch] = useReducer(gameReducer, {
    isHost: 0,
    nameSelected: false,
    playerJoined: false,
    gameStarted: false,
    firstPlayer: null
  })

  useEffect(() => {
    socket.on(events.player_joined, (playerName) => {
      dispatch({
        type: 'set_player_joined',
        value: playerName
      })
    })

    socket.on(events.host_success, (roomID) => {
      socket.joinedRoom = roomID;
      dispatch({
        type: 'set_is_host',
        value: 1
      })
    })
    socket.on(events.room_connected, ({hostName, roomID}) => {
      socket.hostName = hostName;
      socket.joinedRoom = roomID;
      dispatch({
        type: 'set_is_host',
        value: -1
      })
    })

    socket.on(events.host_disconnected, () => {
      socket.emit('leave room', socket.joinedRoom);
      socket.joinedRoom = null
      dispatch({
        type: 'set_is_host',
        value: 0
      })
      dispatch({
        type: 'set_game_started',
        value: false
      })
    })
    socket.on(events.player_disconnected, () => {
      dispatch({
        type: 'set_player_joined',
        value: false
      })
      dispatch({
        type: 'set_game_started',
        value:false
      })
    })
    socket.on(events.start_game, (id) => {
      dispatch({
        type: 'set_game_started',
        value: true,
        id: id
      })
    })
    socket.on('quitted looby', () => {
      socket.joinedRoom = null;
      socket.hostName = null;
      dispatch({
        type: 'set_player_joined',
        value: false
      })
      dispatch({
        type: 'set_is_host',
        value: 0
      })
      dispatch({
        type: 'set_game_started',
        value: false
      })
    })
  }, [])
  return(
    <GameContext.Provider value={gameState}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<NameSelection/>} />
            <Route path='/game' element={<Game/>} />
          </Routes>
        </BrowserRouter>
      </DispatchContext.Provider>
    </GameContext.Provider>    
  ) 
  
  
}

export default App;

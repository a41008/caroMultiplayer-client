import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import socket from '../socket'
import {GameContext, DispatchContext} from '../AppContext'
const Square = forwardRef( (props, ref) => {
    const [letter, setLetter] = useState('');
    const btnRef = useRef(null);
    useImperativeHandle(ref, () => ({
        display: () => console.log(props.pos),
        set: (lett) => {
            if (!letter) setLetter(lett);
            btnRef.current.scrollIntoView();
        },
        setBGC: () => {
            btnRef.current.style.backgroundColor = 'red'
        },
        clear: () => {
            setLetter('');
            btnRef.current.style.backgroundColor = 'white'
        } 
    }))
    const onClick = () => {
        if (letter) return
        props.handleClick(props.pos.x, props.pos.y)
    }
    return <div ref={btnRef} className="square" onClick={onClick}>{letter}</div>
})
export const Board = (props) => {
    const {firstPlayer, isHost} = useContext(GameContext);
    const dispatch = useContext(DispatchContext);
    const [isMyTurn, setIsMyTurn] = useState(firstPlayer === socket.id);
    const [gameEnded, setGameEnded] = useState(false);
    const refs = useRef(Array(props.height).fill(0).map(()=> Array(props.width).fill(0).map(() => React.createRef())));
    const handleClick = (x, y) => {
        socket.emit('tick', {x: x, y: y});
    }
    
    const restart = () => {
        socket.emit('restart game');
    }
    useEffect(() => {
        const handleTick = ({x, y, role}) => {
            refs.current[x][y].current.set(role);
            setIsMyTurn((isMyTurn) => !isMyTurn);
        }
        socket.on('tick', handleTick)
        
        const handleEndGame = ({loc, role, arr}) => {
            refs.current[loc.x][loc.y].current.set(role);
            setIsMyTurn(false);
            arr.forEach((loc) => {
                refs.current[loc.x][loc.y].current.setBGC();
            })
            setGameEnded(() => true);
        }
        socket.on('end game', handleEndGame)

        const handleRestart = ({X}) => {
            refs.current.forEach((row) => {
                row.forEach((item) => {
                    item.current.clear();
                })
            })
            dispatch({
                type: 'set_game_started',
                value: true,
                id: X
            })
            setIsMyTurn(() => socket.id === X)
            setGameEnded(() => false)
        } 
        socket.on('restart game', handleRestart);
        return () => {
            socket.off('tick', handleTick)
            socket.off('end game', handleEndGame)
            socket.off('restart game', handleRestart);
        }
    },[])

    return <div className="board-container">
        <div className="board">
            <div className="board__inner">
                {Array(props.height).fill(0).map((val, idx) => {
                    return  <div className={'row'} key={idx}>
                        {Array(props.width).fill(0).map((val, idy) => {
                            return <Square enabled={isMyTurn} handleClick={handleClick} ref={refs.current[idx][idy]} pos={{x: idx, y: idy}} key={idy}/>
                        })}
                    </div>
                })
                }
            </div>
        </div>
        <div className="board-state">
            <div>{gameEnded ? 'Kết thúc' : isMyTurn ? 'Lượt của mình': 'Lượt của đối thủ'}</div>
            <div><button disabled={isHost === -1 || !gameEnded} onClick={restart}>Ván mới</button></div>
        </div>

    </div>
}
import { useState } from "react"


export const Square = (props) => {
    const [text, setText] = useState('')
    const onPlay = () => {
        if (text) return
        setText(props.currentPlayer);
        props.setPlayer(props.currentPlayer === 'X' ? 'O': 'X')
    }
    return <div className="square" onClick={onPlay}><p>{text}</p></div>
}
import { useContext, useEffect, useState } from "react"
import socket from "../socket"
import { useNavigate } from "react-router-dom"
import events from '../events'
import { DispatchContext} from '../AppContext'
import Header from "./common/Header"
import Footer from "./common/Footer"
const NameSelection = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [rejected, setRejected] = useState(false);

    const dispatch = useContext(DispatchContext);

    const onSubmit = () => {
        if (name)
            socket.emit(events.name_selection, name)
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13)
            onSubmit();
    }
    useEffect(() => {
        socket.on(events.name_accepted, (name) => {
            socket.playerName = name
            dispatch({
                type: 'set_name_selected',
                value: true
            })
            navigate('/game')
        })
        socket.on(events.name_rejected, (name) => {
            setRejected(true)
        })
    })

    return  <div className="name-container">
        <Header/>
        <div className="name-selection">
            <div className="form">
                <input autoFocus type="text" 
                        placeholder="Tên của bạn là gì?" 
                        value={name} 
                        onChange={(e) => setName(() => e.target.value)}
                        onKeyDown={onKeyDown}/>
                <button onClick={onSubmit}>OK</button>
                {rejected ? <p className="rejected">Tên {name} đã được sử dụng bởi người khác, vui lòng nhập lại tên khác</p>:''}
            </div>
        </div>
        <Footer/>
    </div>

}

export default NameSelection;
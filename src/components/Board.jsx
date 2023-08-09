import { Square } from "./Square";

export const Board = (props) => {    
    return <div className="board">
        {Array(props.height).fill(0).map(() => {
            return  <div className={'row'}>
                {Array(props.width).fill(0).map(() => {
                    return <Square currentPlayer={props.currentPlayer} setPlayer={props.setPlayer}/>
                })}
            </div>
        })
        }
    </div>
}
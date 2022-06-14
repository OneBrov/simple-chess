import React from 'react'
import { Board, Colors } from '../classes/Board'
import { Cell } from '../classes/Cell';
import { CellComponent } from './CellComponent';


interface BoardComponentProps {

}

export default function BoardComponent() {
    const [board, setBoard] = React.useState(new Board());
    const [selectedCell, setSelectedCell] = React.useState<Cell>();

    React.useEffect(() => {
      board.restart();
      updateBoard()
    }, [])


    function updateBoard() {
        const renderedBoard = board.getCopyBoard();
        setBoard(renderedBoard);
    }

    function cellClick(cell: Cell) {
        if (selectedCell) {
            selectedCell.figure?.moveTo(cell);
            setSelectedCell(undefined);
        } else {
            setSelectedCell(cell);
        }
       
    }

    function restartClick() {
        setSelectedCell(undefined);
        board.restart();
        updateBoard()
    }



    return (
    <>
        <div className='board'>
            {board.cells.map((row, i) =>
                row.map((cell, j) => 
                    <CellComponent 
                        key={`cell-${i}-${j}`} 
                        color={cell.color} 
                        figure={cell.figure} 
                        onclick={()=>cellClick(cell)}
                        isSelected={selectedCell === cell}
                        isCanMove={selectedCell?.figure?.canMove(cell)}
                    /> 
                )
            )}
            <button className='restartButton' onClick={restartClick}>Restart</button>
            
        </div>
        <div className='rightPanel'>
            <div>
                <b>Current player: </b>
                {board.cells[0][0].board.currentColor === Colors.BLACK ? 'black' : 'white'}
            </div>
            <div>
                <h4>Player White</h4>
                <div>{
                    board.deadFigures.filter(figure => figure.color === Colors.BLACK).map((figure, index)=>
                        <img key={index} src={figure.logo} alt={'' + figure.name}/>
                    )
                }</div>
            </div>
            <div className='w-100'>
                <h4>Player Black</h4>
                <div className='w-100'>
                    {board.deadFigures.filter(figure => figure.color === Colors.WHITE).map((figure, index)=>
                        <img key={index} src={figure.logo} alt={'' + figure.name}/>
                    )}
                </div>
            </div>
            <div>
                {board.cells[0][0].board.gameStatus}
            </div>
        </div>
    </>
    
  )
}

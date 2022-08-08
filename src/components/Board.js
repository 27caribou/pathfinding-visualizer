import { useEffect, useState } from "react";
import Cell from "./Cell";

const Board = ({ size }) => {

    const [ cells, setCells ] = useState([])

    const clearBoard = () => {
        let arr = []
        let start = [ Math.floor(size[0]/2), Math.floor(size[1]/4) ]
        let destination = [ Math.floor(size[0]/2), Math.floor(3*size[1]/4) ]

        for ( let i = 0; i < size[0]; i++ ) {
            for ( let j = 0; j < size[1]; j++ ) {

                let type
                if ( i === start[0] && j === start[1] ){
                    type = 'start'
                } else if ( i === destination[0] && j === destination[1] ){
                    type = 'destination'
                } else {
                    type = 'regular'
                }
                const cell = new Cell([i,j], type)
                arr.push(cell)
            }
        }
        setCells(arr)
    }

    useEffect(() => {
        clearBoard()
        console.log('cleared')
    }, [size])


    return (
        <div className="board">
            <div className="grid">
                { cells.map( (cell, index) => <div
                    key={ index }
                    className={ cell.getClass() }
                    id={ cell.getId() }
                ></div> ) }
            </div>
        </div>
    )
}

export default Board
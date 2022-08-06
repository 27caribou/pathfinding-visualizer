import { useEffect, useState } from "react";

const Board = ({ size }) => {

    const [ nodes, setNodes ] = useState([])

    const clearBoard = () => {
        let arr = []
        for ( let i = 0; i < size[0]; i++ ) {
            for (let j = 0; j < size[1]; j++) {
                arr.push([])
            }
        }
        setNodes(arr)
    }

    useEffect(() => {
        clearBoard()
        console.log('cleared')
    }, [size])


    return (
        <div className="board">
            <div className="grid">
                { nodes.map( (node, index) => <div key={index} className="cell"></div> ) }
            </div>
        </div>
    )
}

export default Board
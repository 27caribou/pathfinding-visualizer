import { useEffect, useState } from "react";
import Node from "./Node";
import BFS from "./BFS";

const Board = () => {

    const [ nodes, setNodes ] = useState([])
    const [ visits, setVisits ] = useState(0)

    const [ rows, setRows ] = useState(15)
    const [ cols, setCols ] = useState(50)
    const [ start, setStart ] = useState([7, 12])
    const [ destination, setDestination ] = useState([7, 27])

    useEffect(() => {
        let arr = []
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {

                let type
                if (`[${i},${j}]` === JSON.stringify(start)){
                    type = 'start'
                } else if (`[${i},${j}]` === JSON.stringify(destination)){
                    type = 'destination'
                } else {
                    type = 'regular'
                }
                arr.push(new Node([i,j], type))
            }
        }

        Node.updateBoard = function () { setVisits( x => x + 1 ) }
        Node.gridDimensions = [ rows, cols ]

        setNodes(arr)
    }, [])

    const getNode = (pos) => {
        let index

        if ( Number.isInteger(pos) ){ // Index
            index = pos
        } else if ( !Array.isArray(pos) ) { // Element ID str
            pos = pos.split('-')
            index = parseInt( pos[0] ) * cols + parseInt( pos[1] )
        } else { // Coords [x,y]
            index = pos[0] * cols + pos[1]
        }

        return nodes[index]
    }

    const findPath = () => {
        let start = document.querySelector('.cell.start').id
        BFS( start, getNode )
    }

    return (
        <div className="board">
            <h2 className="header">Welcome A "Board" HAHA</h2>
            <button className="find-path" onClick={findPath}>Find destination</button>

            <div className="grid">
                { nodes.map( (node, index) => <div
                    key={index}
                    className={`cell ${node.getClass()}`}
                    id={node.getId()}
                ></div> ) }
            </div>
        </div>
    )
}

export default Board;

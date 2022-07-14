import {useCallback, useEffect, useState} from "react";
import Node from "./Node";
import BFS from "./BFS";
import DFS from "./DFS";

const Board = () => {

    const [ nodes, setNodes ] = useState([])
    const [ visits, setVisits ] = useState(0)
    const [ dragType, setDragType ] = useState('')

    const [ rows, setRows ] = useState(15)
    const [ cols, setCols ] = useState(50)
    const [ start, setStart ] = useState([7, 12])
    const [ destination, setDestination ] = useState([4, 27])

    useEffect(() => {
        Node.updateBoard = function () { setVisits( x => x + 1 ) }
        Node.gridDimensions = [ rows, cols ]

        clearBoard()
    }, [])

    useEffect(() => {
        if ( dragType === '' ) return

        const handleMouseEnter = e => {
            console.log('entered', dragType)

            let id = e.target.id
            let node = getNode(id)
            node.setType(dragType)
        }

        document.querySelectorAll('.cell').forEach( cell => {
            cell.addEventListener( 'mouseenter', handleMouseEnter )
        })

        return () => {
            document.querySelectorAll('.cell').forEach( cell => {
                cell.removeEventListener( 'mouseenter', handleMouseEnter )
            })
            setVisits(0)
        }
    }, [dragType])

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
        let solution = BFS( start, getNode )

        if ( solution.length === 0 ){
            console.log('Not found')
            return
        }

        // Trace path found
        let currentNode = solution[0]
        let path = []
        while ( currentNode != null ){
            path.push( currentNode )
            currentNode = currentNode.getPrevious()
        }
        for ( let i = path.length - 1; i >= 0; i-- ) {
            path[i].addToPath( solution[1]++ )
        }

    }

    const clearBoard = () => {
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

        setNodes(arr)
    }

    return (
        <div className="board">
            <h2 className="header">Welcome A "Board" HAHA</h2>
            <p><button className="clear-path" onClick={clearBoard}>Clear Board</button></p>
            <p><button className="find-path" onClick={findPath}>Find destination</button></p>

            <div className="grid">
                { nodes.map( (node, index) => <div
                    key={index}
                    className={`cell ${node.getClass()}`}
                    id={node.getId()}
                    onMouseDown={() => setDragType('wall')}
                    onMouseUp={() => setDragType('')}
                ></div> ) }
            </div>
        </div>
    )
}

export default Board;

import {useCallback, useEffect, useState} from "react";
import Node from "./Node";
import BFS from "./BFS";
import DFS from "./DFS";
import Heap from "./Heap";
import Greedy from "./Greedy";

const Board = () => {

    const [ nodes, setNodes ] = useState([])
    const [ rows, setRows ] = useState(15)
    const [ cols, setCols ] = useState(50)
    const [ visits, setVisits ] = useState(0)
    const [ algo, setAlgo ] = useState('greedy')
    const [ dragType, setDragType ] = useState('')


    useEffect(() => {
        Node.updateBoard = function () { setVisits( x => x + 1 ) }
        Node.gridDimensions = [ rows, cols ] //Move this when row and cols change

        clearBoard()
    }, [])

    useEffect(() => {
        if ( dragType === '' ) return

        const handleMouseEnter = e => {
            let node = getNode( e.target.id )
            let type = node.getType()

            if ( dragType === 'wall' ){
                if ( type === 'start' || type === 'destination' ) return

                if ( type === 'wall' ){
                    node.setType('regular')
                } else {
                    node.setType(dragType)
                }
            } else {
                if ( ( dragType === 'start' && type == 'destination' ) || ( dragType === 'destination' && type == 'start' ) ) return;

                let prev = document.querySelector(`.cell.${dragType}`)
                if ( prev != null ){ // faster than re-render
                    let prevNode = getNode( prev.id )
                    prevNode.setType('regular')
                    node.setType(dragType)
                    prev.classList.remove(dragType)
                }
            }

            Node.updateBoard()
        }

        // TURN FIRST TO WALL?
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

    useEffect(() => updateHeuristics(), [algo])

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
        if ( visits !== 0 ) {
            console.log('reset please')
            return;
        }

        let solution
        let start = document.querySelector('.cell.start').id

        if ( algo === 'bfs' ){
            solution = BFS( start, getNode )
        } else if ( algo === 'dfs' ){
            solution = DFS( start, getNode )
        } else if ( algo === 'greedy' ){
            solution = Greedy( start, getNode )
        }

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
        let start = [ Math.floor(rows/2), Math.floor(cols/4) ]
        let destination = [ Math.floor(rows/2), Math.floor(3*cols/4) ]

        for ( let i = 0; i < rows; i++ ) {
            for ( let j = 0; j < cols; j++ ) {

                let type
                if ( i === start[0] && j === start[1] ){
                    type = 'start'
                } else if ( i === destination[0] && j === destination[1] ){
                    type = 'destination'
                } else {
                    type = 'regular'
                }
                const node = new Node([i,j], type)
                node.setDistance(destination)
                arr.push(node)
            }
        }

        setNodes(arr)
        setVisits(0)
    }

    const updateHeuristics = () => {
        // let destination = document.querySelector('.cell.destination').id
        // for (let node of nodes) {
        //     node.setDistance(destination)
        // }
        console.log('update heuristic')
    }

    const handleMouseDown = e => {
        let classes = e.target.classList

        if ( classes.contains('regular') ) {
            setDragType('wall')
        } else {
            setDragType(classes[1])
        }
    }

    return (
        <div className="board">
            <h2 className="header">Welcome A "Board" HAHA</h2>
            <p><button className="clear-path" onClick={clearBoard}>Clear Board</button></p>
            <p><button className="find-path" onClick={findPath}>Find destination</button></p>

            <div className="grid">
                { nodes.map( (node, index) => <div
                    key={ index }
                    className={ node.getClass() }
                    id={ node.getId() }
                    onMouseDown={ handleMouseDown }
                    onMouseUp={ () => setDragType('') }
                ></div> ) }
            </div>
        </div>
    )
}

export default Board;

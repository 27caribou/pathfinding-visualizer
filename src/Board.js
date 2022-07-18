import {useEffect, useState} from "react";
import Node from "./Node";
import BFS from "./BFS";
import DFS from "./DFS";
import Greedy from "./Greedy";
import UCS from "./UCS";
import AStar from "./AStar";

const Board = () => {

    const [ nodes, setNodes ] = useState([])
    const [ rows, setRows ] = useState(15)
    const [ cols, setCols ] = useState(50)
    const [ visits, setVisits ] = useState(0)
    const [ algo, setAlgo ] = useState('astar')
    const [ dragType, setDragType ] = useState('')

    useEffect(() => {
        Node.updateBoard = function () { setVisits( x => x + 1 ) }
        Node.gridDimensions = [ rows, cols ] //Move this when row and cols change

        clearBoard()
    }, [])

    useEffect(() => {
        if ( dragType === '' ) return
        let mouseIsDown = false

        const handleMouseEnter = e => {
            if ( e.target.classList.contains('start') || e.target.classList.contains('destination') ) return
            let currentNode = getNode( e.target.id )

            if ( ( dragType === 'weight' || dragType === 'wall' ) && mouseIsDown ){
                e.target.classList.replace(currentNode.getType(), dragType)
                currentNode.setType( dragType )
                if ( dragType === 'weight' ){
                    currentNode.setCost(10)
                }

            } else {
                let prev = document.querySelector(`.cell.${dragType}-hover`)
                if ( prev !== null ){
                    let prevNode = getNode( prev.id )
                    prev.classList.replace(`${dragType}-hover`, prevNode.getType())
                }

                e.target.classList.replace(currentNode.getType(), `${dragType}-hover`)
            }
        }
        const handleClick = (e) => {
            if ( e.target.classList.contains('start') || e.target.classList.contains('destination') ) return

            let currentNode = getNode( e.target.id )
            currentNode.setType( dragType )
            if ( dragType === 'destination' ) {
                let newDestination = currentNode.getPos()
                for ( let node of nodes ) {
                    node.setDistance( newDestination )
                }
            }

            setDragType('')
        }
        const handleMouseDown = (e) => {
            mouseIsDown = true
            let currentNode = getNode( e.target.id )
            currentNode.setType( dragType )

            if ( dragType === 'weight' ){
                currentNode.setCost(10)
            }
            e.target.classList.replace(`${dragType}-hover`, dragType)
        }
        const handleMouseUp = () => {
            mouseIsDown = false
            setDragType('')
        }

        // Already set them to hover
        if ( dragType === 'start' || dragType === 'destination' ){
            let start = document.querySelector(`.cell.${dragType}`)

            let currentNode = getNode( start.id )
            currentNode.setType( 'regular' )

            start.classList.replace(dragType, `${dragType}-hover`)
        }

        document.querySelectorAll('.cell').forEach( cell => {
            cell.addEventListener( 'mouseenter', handleMouseEnter )
            if ( dragType === 'weight' || dragType === 'wall' ){
                cell.addEventListener( 'mousedown', handleMouseDown )
                cell.addEventListener( 'mouseup', handleMouseUp )
            } else {
                cell.addEventListener( 'click', handleClick )
            }
        })

        return () => {
            document.querySelectorAll('.cell').forEach( cell => {
                cell.removeEventListener( 'mouseenter', handleMouseEnter )
                if ( dragType === 'weight' || dragType === 'wall' ){
                    cell.removeEventListener( 'mousedown', handleMouseDown )
                    cell.removeEventListener( 'mouseup', handleMouseUp )
                } else {
                    cell.removeEventListener( 'click', handleClick )
                }
            })
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
        } else if ( algo === 'ucs' ){
            solution = UCS( start, getNode )
        } else if ( algo === 'astar' ){
            solution = AStar( start, getNode )
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

    return (
        <div className="board">
            <h2 className="header">Welcome A "Board" HAHA</h2>
            <p><button className="clear-path" onClick={clearBoard}>Clear Board</button></p>
            <br/>
            <p><select className="change-algorithm" onChange={e => setAlgo(e.target.value)} value={algo}>
                <option value="ucs">UCS</option>
                <option value="greedy">Greedy</option>
                <option value="astar">A*</option>
                <option value="dfs">DFS</option>
                <option value="bfs">BFS</option>
            </select></p>
            <br/>
            <p><button onClick={() => setDragType('weight')}>Add Weight</button></p>
            <br/>
            <p><button onClick={() => setDragType('wall')}>Add Wall</button></p>
            <br/>
            <p><button onClick={() => setDragType('start')}>Change Start</button></p>
            <br/>
            <p><button onClick={() => setDragType('destination')}>Change Destination</button></p>

            <p><button className="find-path" onClick={findPath}>Find destination</button></p>

            <div className="grid">
                { nodes.map( (node, index) => <div
                    key={ index }
                    className={ node.getClass() }
                    id={ node.getId() }
                ></div> ) }
            </div>
        </div>
    )
}

export default Board;

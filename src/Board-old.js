import {useEffect, useState} from "react";
import Node from "./Node";
import BFS from "./BFS";
import DFS from "./DFS";
import Greedy from "./Greedy";
import UCS from "./UCS";
import AStar from "./AStar";

const BoardOld = () => {

    /**
     * CREATE A STATIC FUNCTION AND/OR VARIABLE THAT EVERY NODE USES WHEN VISITING
     */
    const [ nodes, setNodes ] = useState([])
    const [ visits, setVisits ] = useState(0)
    const [ algo, setAlgo ] = useState('astar')

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

    return (
        <div className="board">
            <h2 className="header">Welcome A "Board" HAHA</h2>
            <p><select className="change-algorithm" onChange={e => setAlgo(e.target.value)} value={algo}>
                <option value="ucs">UCS</option>
                <option value="greedy">Greedy</option>
                <option value="astar">A*</option>
                <option value="dfs">DFS</option>
                <option value="bfs">BFS</option>
            </select></p>
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

export default BoardOld;

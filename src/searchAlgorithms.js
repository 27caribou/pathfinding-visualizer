import Heap from "./components/Heap";
import { getNeighbors } from "./mazeAlgorithms";

function BFS( start, get ) {
    let queue = new Heap()
    let count = 0
    queue.push([ 0, start, null ])

    while ( !queue.isEmpty() ){
        let item = queue.pop()
        let cell = get( item[1] )

        if ( cell.isVisited() ) continue
        cell.mark( item[0] )
        cell.setPrevious( item[2] )

        if ( cell.getType() === 'target' ) {
            return [ item[0], item[1] ]
        } else {
            // Add VALID neighbors to queue
            let neighbors = getNeighbors( cell.getPos() )
            for ( let pos of neighbors ) {
                let neighborCell = get( pos )
                if ( neighborCell.getType() !== 'wall' && !neighborCell.isVisited() ) {
                    queue.push([ ++count, pos, cell.getPos() ])
                }
            }
        }
    }

    // Not found
    return []
}

function DFS( start, get ) {
    let queue = [[ 0, start, null ]]
    let count = 0

    while ( queue.length != 0 ){
        let item = queue.pop()
        let cell = get( item[1] )

        if ( cell.isVisited() ) continue
        cell.mark( count )
        cell.setPrevious( item[2] )

        if ( cell.getType() === 'target' ) {
            return [ item[0], item[1] ]
        } else {
            // Add VALID neighbors to queue
            let neighbors = getNeighbors( cell.getPos() )
            for ( let pos of neighbors ) {
                let neighborCell = get( pos )
                if ( neighborCell.getType() !== 'wall' && !neighborCell.isVisited() ) {
                    queue.push([ ++count, pos, cell.getPos() ])
                }
            }
        }
    }

    // Not found
    return []
}

function UCS( start, get ) {
    let queue = new Heap()
    let count = 0
    queue.push([ 0, start, null ])

    while ( !queue.isEmpty() ){
        let item = queue.pop()
        let cell = get( item[1] )

        if ( cell.isVisited() ) continue
        cell.mark( count++ )
        cell.setPrevious( item[2] )

        if ( cell.getType() === 'target' ) {
            return [ count, item[1] ]
        } else {
            // Add VALID neighbors to queue
            let neighbors = getNeighbors( cell.getPos() )
            for ( let pos of neighbors ) {
                let neighborCell = get( pos )
                if ( neighborCell.getType() !== 'wall' && !neighborCell.isVisited() ) {
                    queue.push([ item[0] + neighborCell.getCost(), pos, cell.getPos() ])
                }
            }
        }
    }

    // Not found
    return []
}

function Greedy( start, get ) {
    let queue = new Heap()
    let count = 0
    queue.push([ 0, start, null ])

    while ( !queue.isEmpty() ){
        let item = queue.pop()
        let cell = get( item[1] )

        if ( cell.isVisited() ) continue
        cell.mark( count++ )
        cell.setPrevious( item[2] )

        if ( cell.getType() === 'target' ) {
            return [ count, item[1] ]
        } else {
            // Add VALID neighbors to queue
            let neighbors = getNeighbors( cell.getPos() )
            for ( let pos of neighbors ) {
                let neighborCell = get( pos )
                if ( neighborCell.getType() !== 'wall' && !neighborCell.isVisited() ) {
                    queue.push([ neighborCell.getHeuristic(), pos, cell.getPos() ])
                }
            }
        }
    }

    // Not found
    return []
}

function Astar( start, get ) {
    /**
     * In order for the A* algorithm to return the shortest path, the heuristic must be admissible.
     * This means the heuristic must never overestimate the cost. Either it underestimates, or it has it completely correct
     *
     * Manhattan is admissible so the concept is fine.
     * But what's the difference between f(x) of 26 (cost=6,heur=20) and 26 (cost=20,heur=6)?
     * To encourage exploring, I made the cost of visiting a cell be 10, and the heuristic be a multiple of 5, so it
     * always underestimates
     */

    let queue = new Heap()
    let count = 0
    let value = get( start ).getCost() + get( start ).getHeuristic()
    queue.push([ value, start, null ])

    // for (let i = 0; i < 70; i++) {
    while ( !queue.isEmpty() ){
        let item = queue.pop()
        let cell = get( item[1] )

        if ( cell.isVisited() ) continue
        cell.mark( count++ )
        cell.setPrevious( item[2] )

        if ( cell.getType() === 'target' ) {
            return [ count, item[1] ]
        } else {
            // Add VALID neighbors to queue
            let neighbors = getNeighbors( cell.getPos() )
            for ( let pos of neighbors ) {
                let neighborCell = get( pos )
                if ( neighborCell.getType() !== 'wall' && !neighborCell.isVisited() ) {
                    queue.push([
                        item[0] - cell.getHeuristic() + neighborCell.getCost() + neighborCell.getHeuristic(),
                        pos,
                        cell.getPos()
                    ])
                    // let i = document.getElementById(`${pos[0]}-${pos[1]}`)
                    // i.textContent = item[0] - cell.getHeuristic() + neighborCell.getCost() + neighborCell.getHeuristic()
                }
            }
        }
    }

    // Not found
    return [ count, null ]
}


export { BFS, DFS, UCS, Greedy, Astar }

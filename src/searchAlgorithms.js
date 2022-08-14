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


export { BFS, DFS, UCS }

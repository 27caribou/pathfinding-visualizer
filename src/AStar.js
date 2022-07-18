import Heap from "./Heap";

/**
 * In order for the A* algorithm to return the shortest path, the heuristic must be admissible.
 * This means the heuristic must never overestimate the cost. Either it underestimates, or it has it completely correct
 *
 * Manhattan is admissible so the concept is fine.
 * But what's the difference between f(x) of 26 (cost=6,heur=20) and 26 (cost=20,heur=6)?
 * Why is the total not decreasing when going from start to destination in a straight line?
 */
const AStar = ( start, get ) => {
    let queue = new Heap('astar')
    // let visited = new Set()
    let count = 0
    let previous = {}

    let startNode = get(start)
    previous[ startNode.getPos().toString() ] = null
    queue.push([ startNode.getValue('astar'), startNode.getPos() ])

    while ( !queue.isEmpty() ){
    // for (let i = 0; i < 10; i++) {
        let current = queue.pop()
        let currentNode = get(current[1])
        // console.log('current: ', current[0], '\ndistance: ', currentNode.getValue('distance'), '\ncost: ', currentNode.getCost())

        if ( currentNode.isVisited() ) continue;
        currentNode.visit(count++)
        if ( previous[ current[1].toString() ] ){
            let shortestPrev = previous[ current[1].toString() ][ current[0] ]
            currentNode.setPrevious(shortestPrev)
        }

        if ( currentNode.getType() === 'destination' ){
            return [ currentNode, count ]
        } else {
            // Add neighbors to queue
            let neighbors = currentNode.getNeighbors()
            for ( let item of neighbors ) {
                let node = get(item)

                if ( node.getType() !== 'wall' && !node.isVisited() ) {
                    // Current contains heuristic from previous node
                    let score = current[0] - currentNode.getValue('heuristic') + node.getValue('astar')
                    // console.log('score: ',score, '\nitem: ', item, '\ndistance: ', node.getValue('distance'), '\ncost: ', node.getCost())
                    queue.push([ score, item ])

                    let i = item.toString()
                    if ( previous[i] == null ) previous[i] = {}
                    previous[i][ score ] = currentNode
                }
            }
        }
    }

    // Not found
    return []
}

export default AStar

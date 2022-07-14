
const DFS = ( start, get ) => {
    let queue = [ get(start) ]
    let count = 0

    while ( queue.length != 0 ){
        let currentNode = queue.pop()
        currentNode.visit(count++)

        if ( currentNode.getClass() === 'destination' ){
            return [ currentNode, count ]
        } else {
            // Add VALID neighbors to queue
            let neighbors = currentNode.getNeighbors()
            for ( let i = neighbors.length - 1; i >= 0; i-- ) {
                let node = get(neighbors[i])
                // Maybe set param for is in queue to save time
                if ( node.getType() !== 'wall' && !node.isVisited() ) {
                    // May have to move the node up the stack if it is seen again?

                    // !queue.includes(node)
                    if ( queue.includes(node) ){
                        queue = queue.filter( x => x !== node )
                    }
                    queue.push(node)
                    node.setPrevious(currentNode)
                }
            }
        }
    }
}

export default DFS

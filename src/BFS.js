
const BFS = ( start, get ) => {
    let queue = [ get(start) ]
    let count = 0

    // Find destination
    while ( queue.length != 0 ){
        let currentNode = queue.shift()
        currentNode.visit(count++)

        if ( currentNode.getType() === 'destination' ){
            return [ currentNode, count ]
        } else {
            // Add VALID neighbors to queue
            let neighbors = currentNode.getNeighbors()
            for ( let item of neighbors ) {
                let node = get(item)
                if ( node.getType() !== 'wall' && !node.isVisited() && !queue.includes(node) ) {
                    queue.push(node)
                    node.setPrevious(currentNode)
                }
            }
        }
    }
    // Not found
    return []
}

// export default BFS

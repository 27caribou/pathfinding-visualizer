
const BFS = ( start, get ) => {
    let queue = [ get(start) ]
    let count = 0

    // Find destination
    for (let i = 0; i < 600; i++) {
        let currentNode = queue.shift()
        currentNode.visit(count++)

        if ( currentNode.getClass() === 'destination' ){
            break
        } else {
            // Add VALID neighbors to queue
            let neighbors = currentNode.getNeighbors()
            for ( let item of neighbors ) {
                let node = get(item)
                // Maybe set param for is in queue to save time
                if ( !node.isVisited() && !queue.includes(node) ) queue.push(node)
            }
        }
    }

}

export default BFS
import Heap from "./Heap";

const Greedy = ( start, get ) => {
    let queue = new Heap('distance')
    let count = 0
    queue.push( get(start) )

    // Find destination
    while ( !queue.isEmpty() ){
        let currentNode = queue.pop()
        currentNode.visit(count++)

        if ( currentNode.getType() === 'destination' ){
            return [ currentNode, count ]
        } else {
            // Add neighbors to queue
            let neighbors = currentNode.getNeighbors()
            for ( let item of neighbors ) {
                let node = get(item)
                if ( node.getType() !== 'wall' && !node.isVisited() && !queue.hasItem(node) ) {
                    queue.push(node)
                    node.setPrevious(currentNode)
                }
            }
        }
    }
    // Not found
    return []
}

export default Greedy

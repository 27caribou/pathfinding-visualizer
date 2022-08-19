import Cell from "./components/Cell";

function getNeighbors(pos, offset = 1) {
    let size = Cell.boardSize
    let neighbors = []
    if ( pos[0] - offset >= 0 ) {
        neighbors.push([ pos[0] - offset, pos[1] ])
    }
    if ( pos[1] + offset < size[1] ){
        neighbors.push([ pos[0], pos[1] + offset ])
    }
    if ( pos[0] + offset < size[0] ){
        neighbors.push([ pos[0] + offset, pos[1] ])
    }
    if ( pos[1] - offset >= 0 ){
        neighbors.push([ pos[0], pos[1] - offset ])
    }

    return neighbors
}

function createRecursiveMaze(cells, get) {
    let size = Cell.boardSize
    for ( let i = 0; i < size[0]; i++ ) {
        for ( let j = 0; j < size[1]; j++ ) {
            let cell = get([i,j])

            if ( cell.getType() === 'start' || cell.getType() === 'target' ) continue
            if (
                ( i === 0 ) || ( i === size[0] - 1 ) ||
                ( j === 0 ) || ( j === size[1] - 1 )
            ){
                cell.mark( i + j, 'wall', false )
            }
            else if (
                ( i % 2 === 0 ) || ( (i + j) % 2 === 1 ) &&
                ( Math.floor(Math.random() * 4) < 3 )
            ){
                cell.mark( i + j, 'wall', false )
            }
        }
    }

    const recurse = (current, count) => {
        // Visit current node
        let currentCell = get( current )
        currentCell.mark( ++count, currentCell.getType() )

        // Get unvisited neighbors
        let unvisited = getNeighbors( current, 2 ).filter( i => !get(i).isVisited() )
        while ( unvisited.length !== 0 ){
            // Normal random
            let random = Math.floor( Math.random() * unvisited.length )
            // Skew ( Uncomment )
            // if ( true && Math.floor( Math.random() * 4 ) > 0 ){
            //     let options = unvisited.filter( x => ( x[1] === current[1] + 2 ) || ( x[1] === current[1] - 2 ) )
            //     if ( options.length !== 0 ) {
            //         random = unvisited.indexOf( options[ Math.floor( Math.random() * options.length ) ] )
            //     }
            // }

            let selected = unvisited[ random ]
            // Break down the wall between current and selected
            let wallPos = [ (selected[0] - current[0])/2, (selected[1] - current[1])/2 ]
            let wall = get([ current[0] + wallPos[0], current[1] + wallPos[1] ])
            if ( wall.getType() === 'wall' ) {
                wall.mark( ++count, 'regular' )
            } else {
                wall.mark( ++count, wall.getType() )
            }

            recurse( selected, count )
            // Update list
            unvisited = unvisited.filter( i => !get(i).isVisited() )
        }
    }

    let corners = [ [1,1], [size[0]-2, 1], [1, size[1]-2], [size[0]-2, size[1]-2] ]
    recurse(corners[ Math.floor( Math.random() * corners.length ) ], size[0] + size[1])
}

function createRandomMaze(type, get) {
    let size = Cell.boardSize

    for ( let i = 0; i < size[0]; i++ ) {
        for ( let j = 0; j < size[1]; j++ ) {
            let cell = get([i,j])

            if ( cell.getType() === 'start' || cell.getType() === 'target' ) continue
            // Changing number makes more sparse/dense
            if ( Math.floor(Math.random() * 4) === 1 ){
                cell.mark( i + j, type, false )
            }
        }
    }
}

export { createRecursiveMaze, createRandomMaze, getNeighbors }
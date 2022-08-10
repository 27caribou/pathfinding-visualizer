import Cell from "./components/Cell";
import { useState } from "react";

function getResponsiveGridSize(e) {
    let width, rows, cols
    if ( Number.isInteger(e) ){
        width = e
    } else {
        width = e.target.innerWidth
    }

    // From index.css
    if ( width <= 805) {
        rows = 9
        cols = 25
    } else if ( width <= 864) {
        rows = 11
        cols = 27
    } else if ( width <= 1000) {
        rows = 11
        cols = 29
    } else if ( width <= 1150) {
        rows = 13
        cols = 33
    } else if ( width <= 1280) {
        rows = 13
        cols = 39
    } else if ( width <= 1440) {
        rows = 15
        cols = 41
    } else if ( width <= 1570) {
        rows = 17
        cols = 47
    } else {
        rows = 17
        cols = 53
    }

    return [ rows, cols ]
}

function newBoard(size) {
    let arr = []
    let start = [ Math.floor(size[0]/2), Math.floor(size[1]/4) ]
    let target = [ Math.floor(size[0]/2), Math.floor(3*size[1]/4) ]

    for ( let i = 0; i < size[0]; i++ ) {
        for ( let j = 0; j < size[1]; j++ ) {

            let type
            if ( i === start[0] && j === start[1] ){
                type = 'start'
            } else if ( i === target[0] && j === target[1] ){
                type = 'target'
            } else {
                type = 'regular'
            }
            const cell = new Cell([i,j], type)
            arr.push(cell)
        }
    }
    return arr
}

function addMazePattern(pattern, size, cells, get) {
    if ( pattern === 'recursive division' ){
        createRecursiveMaze( size, cells, get )
    } else if ( pattern === 'random weights' ) {
        createRandomMaze( size, 'weight', get )
    } else if ( pattern === 'random walls' ) {
        createRandomMaze( size, 'wall', get )
    }
}

function getNeighbors(pos, size, offset = 1) {
    let neighbors = []
    if ( pos[0] - offset >= 0 ){
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

function createRecursiveMaze(size, cells, get) {
    for ( let i = 0; i < size[0]; i++ ) {
        for ( let j = 0; j < size[1]; j++ ) {
            let cell = get([i,j])

            if ( cell.getType() === 'start' || cell.getType() === 'target' ) continue
            if (
                ( i === 0 ) || ( i === size[0] - 1 ) ||
                ( j === 0 ) || ( j === size[1] - 1 ) ||
                ( i % 2 === 0 ) || ( (i + j) % 2 === 1 )
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
        let unvisited = getNeighbors( current, size, 2 ).filter( i => !get(i).isVisited() )
        while ( unvisited.length !== 0 ){
            // Choose one randomly
            let selected = unvisited[ Math.floor(Math.random() * unvisited.length) ]
            // Break down the wall between current and selected
            let wallPos = [ (selected[0] - current[0])/2, (selected[1] - current[1])/2 ]
            let wall = get([ current[0] + wallPos[0], current[1] + wallPos[1]])
            wall.mark( ++count, 'regular' )

            recurse( selected, count )
            // Update list
            unvisited = unvisited.filter( i => !get(i).isVisited() )
        }
    }

    recurse([1,1], size[0] + size[1])
}

function createRandomMaze(size, type, get) {
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


// Custom forceUpdate hook
function useForceUpdate() {
    const [ value, setValue ] = useState(0);
    return () => setValue(value => value + 1);
}

export { getResponsiveGridSize, newBoard, addMazePattern, useForceUpdate }

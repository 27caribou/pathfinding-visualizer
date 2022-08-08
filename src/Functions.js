import Cell from "./components/Cell";

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
    let destination = [ Math.floor(size[0]/2), Math.floor(3*size[1]/4) ]

    for ( let i = 0; i < size[0]; i++ ) {
        for ( let j = 0; j < size[1]; j++ ) {

            let type
            if ( i === start[0] && j === start[1] ){
                type = 'start'
            } else if ( i === destination[0] && j === destination[1] ){
                type = 'destination'
            } else {
                type = 'regular'
            }
            const cell = new Cell([i,j], type)
            arr.push(cell)
        }
    }
    return arr
}


export { getResponsiveGridSize, newBoard }

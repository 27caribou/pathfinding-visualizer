
const getResponsiveGridSize = (e) => {
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

export default getResponsiveGridSize
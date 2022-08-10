
export default class Cell {
    #position;
    #type;
    #visited = false
    #previous = null
    #cost = 1
    #searchStatus = ''

    static gridDimensions;
    static updateBoard

    constructor( pos, type = 'regular' ) {
        this.#position = pos
        this.#type = type
    }

    getClass() { return `cell ${this.#type} ${this.#searchStatus}` }

    getId() { return `${ this.#position[0] }-${ this.#position[1] }` }

    setType(type) { this.#type = type }

    getType() { return this.#type }

    getPos() { return this.#position }

    // Acts like the visit and animate functions
    mark( order, status = 'visited', markVisit = true ) {
        if ( markVisit ) this.#visited = true
        setTimeout(() => {
            if ( [ 'visited', 'path' ].includes( status ) ) {
                this.#searchStatus = status
            } else {
                this.setType(status)
            }

            Cell.updateBoard()
        }, 50 * order )
    }

    isVisited() { return this.#visited === true }

}

export default class Cell {
    #position;
    #type;
    #visited = false
    #previous = null
    #cost = 1
    #distance;
    #searchStatus = ''

    static boardSize;
    static updateBoard

    constructor( pos, type = 'regular' ) {
        this.#position = pos
        this.#type = type
    }

    getClass() { return `cell ${this.#type} ${this.#searchStatus}` }

    getId() { return `${ this.#position[0] }-${ this.#position[1] }` }

    setType(type) {
        this.#type = type

        if ( type === 'weight' ) {
            this.#cost = 10
        } else if ( this.#cost === 50 ) {
            this.#cost = 50
        }
    }

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
        }, 30 * order )
    }

    clearVisit() {
        this.#visited = false
        this.#searchStatus = ''
    }

    isVisited() { return this.#visited === true }

    setPrevious(prev) { this.#previous = prev }

    getPrevious() { return this.#previous }

    setCost(cost) { this.#cost = cost }

    getCost() { return this.#cost }

    setDistance(distance) { this.#distance = distance }

    getDistance() { return this.#distance }

}
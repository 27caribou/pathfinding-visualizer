
export default class Cell {
    #position;
    #type;
    #visited = false
    #previous = null
    #cost = 10
    #heuristic;
    #searchStatus = ''

    static boardSize;
    static animationSpeed = 40;
    static updateBoard;

    constructor( pos, type = 'regular' ) {
        this.#position = pos
        this.#type = type
    }

    getClass() { return `cell ${this.#type} ${this.#searchStatus}` }

    getId() { return `${ this.#position[0] }-${ this.#position[1] }` }

    setType(type) {
        this.#type = type

        if ( type === 'weight' ) {
            this.#cost = 50
        } else if ( this.#cost === 50 ) {
            this.#cost = 10
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
        }, Cell.animationSpeed * order )
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

    setHeuristic(heuristic) { this.#heuristic = heuristic }

    getHeuristic() { return this.#heuristic }

}
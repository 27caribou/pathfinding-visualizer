
export default class Cell {
    #position;
    #type;
    #visited = false
    #previous = null
    #cost = 1
    #animationType = ''

    static gridDimensions;
    static updateBoard

    constructor( pos, type = 'regular' ) {
        this.#position = pos
        this.#type = type
    }

    getClass() { return `cell ${this.#type} ${this.#animationType}` }

    getId() { return `${ this.#position[0] }-${ this.#position[1] }` }

    setType(type) { this.#type = type }

    getType() { return this.#type }

    getPos() { return this.#position }

    #animateCell( order, type ) {
        setTimeout(() => {
            this.#animationType = type
            Cell.updateBoard()
        }, 50 * order )
    }

    visit( order ) {
        this.#visited = true
        this.#animateCell( order, 'visited' )
    }

    addToPath( order ) {
        this.#animateCell( order, 'path' )
    }

}
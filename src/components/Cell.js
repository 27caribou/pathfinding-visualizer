
export default class Cell {
    #position;
    #type;
    #visited = false
    #previous = null
    #cost = 1
    #inAnimationQueue = false // Animation related
    #animationType = ''

    static gridDimensions;

    constructor( pos, type = 'regular' ) {
        this.#position = pos
        this.#type = type
    }

    getClass(){
        return `cell ${this.#type}`
    }

    getId(){
        return `${ this.#position[0] }-${ this.#position[1] }`
    }

}
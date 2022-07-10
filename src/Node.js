
export default class Node {
    #coords;
    #type;
    #visited = false
    #previousNode = null
    #animationStatus = ''

    static updateBoard;
    static gridDimensions;

    constructor(coords, type = 'regular') {
        this.#coords = coords
        this.#type = type
    }

    getClass(){
        return this.#type + this.#animationStatus
    }

    getId(){
        return `${ this.#coords[0] }-${ this.#coords[1] }`
    }

    visit(delay){
        this.#visited = true
        // Animation
        setTimeout(() => {
            this.#animationStatus = ' visited'
            Node.updateBoard()
        }, 20 * delay)
    }

    addToPath(delay){
        setTimeout(() => {
            this.#animationStatus = ' path'
            Node.updateBoard()
        }, 20 * delay)
    }

    isVisited(){
        return this.#visited === true
    }

    getPrevious(){
        return this.#previousNode
    }

    setPrevious(prev){
        this.#previousNode = prev
    }

    getNeighbors(){
        let neighbors = []
        // TYPE IS NOT WALL
        if ( this.#coords[0] - 1 >= 0 ){
            neighbors.push([ this.#coords[0] - 1, this.#coords[1] ])
        }
        if ( this.#coords[1] + 1 < Node.gridDimensions[1] ){
            neighbors.push([ this.#coords[0], this.#coords[1] + 1 ])
        }
        if ( this.#coords[0] + 1 < Node.gridDimensions[0] ){
            neighbors.push([ this.#coords[0] + 1, this.#coords[1] ])
        }
        if ( this.#coords[1] - 1 >= 0 ){
            neighbors.push([ this.#coords[0], this.#coords[1] - 1 ])
        }

        return neighbors
    }
}
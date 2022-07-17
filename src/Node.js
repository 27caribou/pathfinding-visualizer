
export default class Node {
    #coords;
    #type;
    #visited = false
    #previousNode = null
    #animationStatus = ''
    #distanceFromDestination;
    #cost = 1;

    static updateBoard;
    static gridDimensions;
    static timeOUT = 20

    constructor(coords, type = 'regular') {
        this.#coords = coords
        this.#type = type
    }

    setType(type){
        this.#type = type
    }

    getType(){
        return this.#type
    }

    getClass(){
        return `cell ${this.#type} ${this.#animationStatus}`
    }

    getId(){
        return `${ this.#coords[0] }-${ this.#coords[1] }`
    }

    visit(delay){
        this.#visited = true
        // Animation
        setTimeout(() => {
            this.#animationStatus = 'visited'
            Node.updateBoard()
        }, Node.timeOUT * delay)
    }

    addToPath(delay){
        setTimeout(() => {
            this.#animationStatus = 'path'
            Node.updateBoard()
        }, Node.timeOUT * delay)
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

    setDistance(target){
        let distance = Math.abs(this.#coords[0] - target[0] ) + Math.abs(this.#coords[1] - target[1] )
        this.#distanceFromDestination = distance
    }

    getValue(type){
        if ( type === 'distance' ){
            return this.#distanceFromDestination
        } else if ( type === 'cost' ){
            return this.#cost
        }
        return -1
    }

    getCost(){
        return this.#cost
    }

    setCost(cost){
        this.#cost = cost
    }

    setCumulativeCost(prevCost) {
        this.#cost = prevCost + this.#cost
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
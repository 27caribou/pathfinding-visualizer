
export default class Node {
    #coords;
    #type;
    #visited = false

    static updateBoard;

    constructor(coords, type = 'regular') {
        this.#coords = coords
        this.#type = type
    }

    getClass(){
        if ( this.#visited ){
            return this.#type + ' visited'
        }
        return this.#type
    }

    getId(){
        return `${ this.#coords[0] }-${ this.#coords[1] }`
    }

    visit(delay){
        setTimeout(() => {
            this.#visited = true
            Node.updateBoard()
        }, 30 * delay)
    }

    isVisited(){
        return this.#visited === true
    }
}
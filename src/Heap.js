
export default class Heap {
    #data;
    // USE A SET TO REDUCE CHECK TIME?
    #valueType;

    constructor(valueType) {
        this.#data = []
        this.#valueType = valueType
    }

    #getParentIndex(i) {
        return i === 0 ? i : Math.floor( ( i - 1 ) / 2 )
    }

    #getLeftChildIndex(i) {
        return i * 2 + 1
    }

    #getRightChildIndex(i) {
        return i * 2 + 2
    }

    isEmpty() {
        return this.#data.length === 0
    }

    hasItem(item) {
        return this.#data.includes(item)
    }

    #getValue(i) {
        if ( !Array.isArray( this.#data[i] ) ){
            return this.#data[i].getValue( this.#valueType )
        }
        return this.#data[i][0]
    }

    #swap(i1, i2){
        let temp = this.#data[i1]
        this.#data[i1] = this.#data[i2]
        this.#data[i2] = temp
    }

    push(item){
        this.#data.push(item)
        this.#heapifyUp()
    }

    #heapifyUp(){
        let currentIndex = this.#data.length - 1
        let parentIndex = this.#getParentIndex( currentIndex )

        // Integers: this.#data[currentIndex] < this.#data[parentIndex]
        while ( this.#getValue(currentIndex) < this.#getValue(parentIndex) ){
            this.#swap(currentIndex, parentIndex)

            currentIndex = parentIndex
            parentIndex = this.#getParentIndex( currentIndex )
        }
    }

    pop(){
        if ( this.#data.length === 0 ) return null

        let minValue = this.#data[0]
        if ( this.#data.length === 1 ){
            this.#data.pop()
        } else {
            this.#data[0] = this.#data.pop()
            this.#heapifyDown()
        }

        return minValue
    }

    #heapifyDown(){
        let currentIndex = 0
        let leftChildIndex = this.#getLeftChildIndex( currentIndex )

        while ( leftChildIndex < this.#data.length ){
            let smallest = this.#getValue(currentIndex) < this.#getValue(leftChildIndex) ? currentIndex : leftChildIndex
            if ( this.#getRightChildIndex( currentIndex ) < this.#data.length ){
                let rightChildIndex = this.#getRightChildIndex( currentIndex )
                smallest = this.#getValue(smallest) < this.#getValue(rightChildIndex) ? smallest : rightChildIndex
            }

            if ( this.#getValue(currentIndex) > this.#getValue(smallest) ){
                this.#swap(currentIndex, smallest)
                currentIndex = smallest
                leftChildIndex = this.#getLeftChildIndex( currentIndex )
            } else {
                return
            }
        }

    }

}
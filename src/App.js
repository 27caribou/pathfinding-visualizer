import { useEffect, useState } from "react";
import { addMazePattern, getPath, getResponsiveGridSize, newBoard, useForceUpdate } from "./Functions";
import Navigation from "./components/Navigation";
import Controls from "./components/Controls";
import Cell from "./components/Cell";

const App = () => {

    const [ size, setSize ] = useState( getResponsiveGridSize( window.innerWidth ) )
    const [ cells, setCells ] = useState([])
    const [ algo, setAlgo ] = useState('')
    const [ pattern, setPattern ] = useState('')
    const [ speed, setSpeed ] = useState(50)
    const [ dragType, setDragType ] = useState('')
    const [ editMode, setEditMode ] = useState(true)
    const forceUpdate = useForceUpdate()

    useEffect(() => {
        // Change board size if window is resized
        const changeSize = (e) => {
            let size = getResponsiveGridSize(e)
            // Re-render only if different
            setSize( prev => ( prev[0] === size[0] && prev[1] === size[1] ) ? prev : size )
        }
        window.addEventListener("resize", changeSize)

        Cell.updateBoard = forceUpdate
        Cell.animationSpeed = speed

        return () => {
            window.removeEventListener("resize", changeSize)
        }
    }, [])

    useEffect(() => {
        setCells( newBoard(size) )
        Cell.boardSize = size
    }, [size])

    useEffect(() => { if ( pattern !== '' ) setCells( newBoard(size) ) }, [pattern])

    useEffect(() => { Cell.animationSpeed = speed }, [speed])

    useEffect(() => {
        if ( cells.length === 0 ) return
        updateHeuristic()

        if ( pattern !== '' ) {
            addMazePattern( pattern, cells, getCell )
            setPattern('')
        }
    }, [cells])

    /* HANDLE DRAG EVENTS */
    useEffect(() => {
        if ( dragType === '' ) return
        let mouseIsDown = false

        // Already set them to hover
        if ( dragType === 'start' || dragType === 'target' ){
            let cell = document.querySelector(`.cell.${dragType}`)

            let cellObj = getCell( cell.id )
            cellObj.setType( 'regular' )

            cell.classList.replace(dragType, `${dragType}-hover`)
        }

        const handleMouseEnter = e => {
            if ( e.target.classList.contains('start') || e.target.classList.contains('target') ) return
            let currentCell = getCell( e.target.id )

            if ( ( dragType === 'weight' || dragType === 'wall' ) && mouseIsDown ){ // Dragging mouse
                // Toggle type
                if ( currentCell.getType() === dragType ) {
                    e.target.classList.replace(dragType, 'regular')
                    currentCell.setType( 'regular' )
                } else {
                    e.target.classList.replace(currentCell.getType(), dragType)
                    currentCell.setType( dragType )
                }

            } else { // Normal enter
                let prev = document.querySelector(`.cell.${dragType}-hover`)
                if ( prev !== null ){
                    let prevCell = getCell( prev.id )
                    prev.classList.replace(`${dragType}-hover`, prevCell.getType())
                }

                e.target.classList.replace(currentCell.getType(), `${dragType}-hover`)
            }
        }
        const handleClick = (e) => {
            if ( e.target.classList.contains('start') || e.target.classList.contains('target') ) return

            let currentCell = getCell( e.target.id )
            currentCell.setType( dragType )
            if ( dragType === 'target' ) updateHeuristic( currentCell.getPos() )

            setDragType('')
        }
        const handleMouseDown = (e) => {
            mouseIsDown = true
            let currentCell = getCell( e.target.id )
            currentCell.setType( dragType )

            e.target.classList.replace(`${dragType}-hover`, dragType)
        }
        const handleMouseUp = () => {
            mouseIsDown = false
            setDragType('')
        }

        document.querySelectorAll('.cell').forEach( cell => {
            cell.addEventListener( 'mouseenter', handleMouseEnter )
            if ( dragType === 'weight' || dragType === 'wall' ){
                cell.addEventListener( 'mousedown', handleMouseDown )
                document.querySelector('.grid').addEventListener( 'mouseup', handleMouseUp )
            } else {
                cell.addEventListener( 'click', handleClick )
            }
        })

        return () => {
            document.querySelectorAll('.cell').forEach( cell => {
                cell.removeEventListener( 'mouseenter', handleMouseEnter )
                if ( dragType === 'weight' || dragType === 'wall' ){
                    cell.removeEventListener( 'mousedown', handleMouseDown )
                    document.querySelector('.grid').removeEventListener( 'mouseup', handleMouseUp )
                } else {
                    cell.removeEventListener( 'click', handleClick )
                }
            })
        }
    }, [dragType])
    /* HANDLE DRAG EVENTS - END */

    const getCell = (pos) => {
        if ( pos === null ) return null
        let index

        if ( Number.isInteger(pos) ){ // Index
            index = pos
        } else if ( !Array.isArray(pos) ) { // Element ID str
            pos = pos.split('-')
            index = parseInt( pos[0] ) * size[1] + parseInt( pos[1] )
        } else { // Coords [x,y]
            index = pos[0] * size[1] + pos[1]
        }

        return cells[index]
    }

    const setSetting = (key, value) => {
        if ( key === 'algo' ) {
            setAlgo( value )
        } else if ( key === 'pattern' ){
            setPattern( oldValue => value )
        } else {
            setSpeed( value )
        }
    }

    const updateHeuristic = (pos = null) => {
        if ( pos === null ) pos = document.querySelector('.cell.target').id
        let target = getCell(pos).getPos()

        for ( let cell of cells ) {
            let cellPos = cell.getPos()
            cell.setHeuristic(
                Math.abs(cellPos[0] - target[0] ) + Math.abs(cellPos[1] - target[1] ) * 15
            )
        }
    }

    const findPath = () => {
        if ( !algo ) {
            console.log('No algorithm selected.')
            return;
        }
        setEditMode(false) // Prevent controls to mess with current path finding
        clearPath()

        let start = document.querySelector('.cell.start').id
        let solution = getPath( start, algo, getCell )

        if ( solution.length === 0 || solution[1] === null ){
            console.log('Not found...')
        } else {
            // Retrace path
            let currentNode = getCell( solution[1] )
            let path = []
            while ( currentNode != null ){
                path.push( currentNode )
                currentNode = getCell( currentNode.getPrevious() )
            }
            for ( let i = path.length - 1; i >= 0; i-- ) {
                path[i].mark( solution[0]++, 'path' )
            }
        }

        setTimeout(() => {
            setEditMode(true) // Re-enable controls
        }, Cell.animationSpeed * solution[0] )
    }

    const clearPath = () => {
        for ( let cell of cells ) {
            cell.clearVisit()
            forceUpdate()
        }
    }

    return (
        <>
            <Navigation
                set={ setSetting }
                clearBoard={ () => setCells( newBoard(size) ) }
                clearPath={ clearPath }
                editMode={ editMode }
            />
            <Controls
                start={ findPath }
                drag={ i => setDragType(i) }
                algo={ algo }
                editMode={ editMode }
            />

            <div className="board">
                <div className="grid">
                    { cells.map( (cell, index) => <div
                        key={ index }
                        className={ cell.getClass() }
                        id={ cell.getId() }
                    ></div> ) }
                </div>
            </div>

            <div className="credit">© 2022 Teddy N'go</div>
        </>
    )
}

export default App
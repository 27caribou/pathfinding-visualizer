import { useEffect, useState } from "react";
import { getResponsiveGridSize, newBoard } from "./Functions";
import Navigation from "./components/Navigation";
import Controls from "./components/Controls";
import Cell from "./components/Cell";

const App = () => {

    const [ size, setSize ] = useState( getResponsiveGridSize( window.innerWidth ) )
    const [ settings, setSettings ] = useState({})
    const [ cells, setCells ] = useState([])

    // Handle board size if window is resized
    useEffect(() => {
        const changeSize = (e) => {
            let size = getResponsiveGridSize(e)

            // Re-render only if different
            setSize( prev => ( prev[0] === size[0] && prev[1] === size[1] ) ? prev : size )
        }
        window.addEventListener("resize", changeSize)

        return () => {
            window.removeEventListener("resize", changeSize)
        }
    }, [])

    useEffect(() => {
        setCells( newBoard(size) )

        Cell.gridDimensions = size
        console.log('cleared')
    }, [size])

    return (
        <>
            <Navigation />
            <Controls />

            <div className="board">
                <div className="grid">
                    { cells.map( (cell, index) => <div
                        key={ index }
                        className={ cell.getClass() }
                        id={ cell.getId() }
                    ></div> ) }
                </div>
            </div>
        </>
    )
}

export default App
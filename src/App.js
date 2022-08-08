import Board from "./components/Board";
import { useEffect, useState } from "react";
import getResponsiveGridSize from "./GridChange";

const App = () => {

    const [ size, setSize ] = useState( getResponsiveGridSize( window.innerWidth ) )

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

    const navOptions = {
        'Algorithms': [ 'UCS', 'Greedy', 'Astar', 'DFS', 'BFS' ],
        'Maze Patterns': [ 'Pattern 1', 'Pattern 2', 'Pattern 3' ],
        'Clear Board': [],
        'Clear Path': [],
        'Speed': [ 'Fast', 'Normal', 'Slow' ]
    }
    const navigation = <section className="navigation">
        <div className="header">Pathfinding Visualizer</div>
        <div className="navbar">
            <div className="navbar-inner">
                { Object.entries(navOptions).map( ([ key, value ]) => {
                    return <span className="option">
                        { key }
                        { value.length > 0
                            ? <ul className="dropdown">
                                { value.map( x => <li>{x}</li>) }
                            </ul>
                            : ''
                        }
                    </span>
                }) }
            </div>
        </div>
    </section>

    const controls = <section className="control-board">
        <div className="legend">
            <h3>Legend</h3>
            <ul className="item-list">
                { ['Start', 'Target', 'Weight', 'Wall', 'Visited', 'Shortest-path'].map( x => {
                    return  (
                        <li className="item">
                            <div className="desc">
                                <span className={ x.toLowerCase() + " symbol" }></span>
                                {x} Node
                            </div>
                        </li>
                    )
                }) }
                <li>
                    <button className="find-path">Find Path!</button>
                </li>
            </ul>
        </div>
        <p className="algorithm-description">Pick an algorithm!</p>
    </section>

    return (
        <>
            { navigation }
            { controls }
            <Board size={size} />
        </>
    )
}

export default App
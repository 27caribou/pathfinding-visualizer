import Board from "./Board";
import { useEffect, useState } from "react";

const App = () => {

    const [ size, setSize ] = useState([17,53])

    useEffect(() => {

        const changeSize = (e) => {
            let rows, cols

            // From index.css
            if ( e.target.innerWidth <= 805 ) {
                rows = 9
                cols = 25
            } else if ( e.target.innerWidth <= 864 ) {
                rows = 11
                cols = 27
            } else if ( e.target.innerWidth <= 1000 ) {
                rows = 11
                cols = 29
            } else if ( e.target.innerWidth <= 1150 ) {
                rows = 13
                cols = 33
            } else if ( e.target.innerWidth <= 1280 ) {
                rows = 13
                cols = 39
            } else if ( e.target.innerWidth <= 1440 ) {
                rows = 15
                cols = 41
            } else if ( e.target.innerWidth <= 1570 ) {
                rows = 17
                cols = 47
            } else {
                rows = 17
                cols = 53
            }

            // Re-render only if different
            setSize( prev => ( prev[0] === rows && prev[1] === cols ) ? prev : [ rows, cols ] )
        }
        window.addEventListener("resize", changeSize)

        return () => {
            window.removeEventListener("resize", changeSize)
        }

    }, [])

    const navigation = <section className="navigation">
        <div className="header">Pathfinding Visualizer</div>
        <div className="navbar">
            <div className="navbar-inner">
                <span className="option">Algorithms</span>
                <span className="option">Maze Patterns</span>
                <span className="option">Board Dimensions</span>
                <span className="option">Clear Board</span>
                <span className="option">Clear Path</span>
                <span className="option">Speed</span>
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
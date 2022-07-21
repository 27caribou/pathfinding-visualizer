
const App = () => {

    const navigation = <section className="navigation">
        <div className="header">Pathfinding Visualizer</div>
        <div className="navbar">
            <div className="navbar-inner">
                <span className="option">Algorithms</span>
                <span className="option">Maze Patterns</span>
                <span className="option">Clear Board</span>
                <span className="option">Clear Path</span>
                <span className="option">Speed</span>
            </div>
        </div>
    </section>

    return (
        <>
            { navigation }
            <section className="control-board">
                <div>
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
                        </ul>
                    </div>
                    <div>
                        <button className="find-path">Find Path!</button>
                    </div>
                </div>
                <p>Pick an algorithm!</p>
            </section>
        </>
    )
}

export default App
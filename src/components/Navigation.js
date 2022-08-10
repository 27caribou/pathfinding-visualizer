
const Navigation = ({ set, clearBoard }) => {

    return (
        <section className="navigation">
            <div className="header">Pathfinding Visualizer</div>
            <div className="navbar">
                <div className="navbar-inner">
                    <span className="option">
                        Algorithms
                        <ul className="dropdown">
                            { [ 'BFS', 'DFS', 'UCS', 'Greedy', 'Astar' ].map( x =>
                                <li key={x} onClick={ () => set( 'algo', x.toLowerCase() ) }>{x}</li>
                            ) }
                        </ul>
                    </span>
                    <span className="option">
                        Maze Patterns
                        <ul className="dropdown">
                            { [ 'Recursive Division', 'Random Weights', 'Random Walls' ].map( x =>
                                <li key={x} onClick={ () => set( 'pattern', x.toLowerCase() ) }>{x}</li>
                            ) }
                        </ul>
                    </span>
                    <span className="option">
                        Speed
                        <ul className="dropdown">
                            { [ 'Fast', 'Mid', 'Slow' ].map( x =>
                                <li key={x} onClick={ () => set( 'speed', x.toLowerCase() ) }>{x}</li>
                            ) }
                        </ul>
                    </span>
                    <span className="option">
                        Clear Path
                    </span>
                    <span className="option" onClick={clearBoard}>Clear Board</span>
                </div>
            </div>
        </section>
    )
}

export default Navigation
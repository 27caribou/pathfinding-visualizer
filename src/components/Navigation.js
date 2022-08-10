
const Navigation = ({ set, clearBoard }) => {

    return (
        <section className="navigation">
            <div className="header">Pathfinding Visualizer</div>
            <div className="navbar">
                <div className="navbar-inner">
                    <span className="option">
                        Algorithms
                        <ul className="dropdown">
                            { [ 'UCS', 'Greedy', 'Astar', 'DFS', 'BFS' ].map( x =>
                                <li key={x} onClick={ () => set( 'algo', x.toLowerCase() ) }>{x}</li>
                            ) }
                        </ul>
                    </span>
                    <span className="option">
                        Maze Patterns
                        <ul className="dropdown">
                            { [ 'Pattern 1', 'Pattern 2', 'Pattern 3' ].map( x =>
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
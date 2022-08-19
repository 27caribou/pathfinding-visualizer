
const Navigation = ({ set, clearBoard, clearPath, editMode }) => {

    return (
        <section className="navigation">
            <div className="header">Pathfinding Visualizer</div>
            <div className={ editMode ? "navbar" : "navbar disabled" }>
                <div className="navbar-inner">
                    <span className="option">
                        Algorithms
                        <ul className="dropdown">
                            { [ 'BFS', 'DFS', 'UCS', 'Greedy', 'Astar' ].map( x =>
                                <li key={x} onClick={ () => editMode && set( 'algo', x.toLowerCase() ) }>{x}</li>
                            ) }
                        </ul>
                    </span>
                    <span className="option">
                        Maze Patterns
                        <ul className="dropdown">
                            { [ 'Recursive Division', 'Random Weights', 'Random Walls' ].map( x =>
                                <li key={x} onClick={ () => editMode && set( 'pattern', x.toLowerCase() ) }>{x}</li>
                            ) }
                        </ul>
                    </span>
                    <span className="option">
                        Speed
                        <ul className="dropdown">
                            { [ 'Fast', 'Normal', 'Slow' ].map( x =>
                                <li key={x} onClick={ () => {
                                    if ( !editMode ) return
                                    let speed = x === 'Fast' ? 10 : ( x === 'Normal' ? 60 : 200 )
                                    set( 'speed', speed )
                                } }>{x}</li>
                            ) }
                        </ul>
                    </span>
                    <span className="option" onClick={ () => editMode && clearPath() }>Clear Path</span>
                    <span className="option" onClick={ () => editMode && clearBoard() }>Clear Board</span>
                </div>
            </div>
        </section>
    )
}

export default Navigation
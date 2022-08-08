
const Navigation = () => {

    const navOptions = {
        'Algorithms': [ 'UCS', 'Greedy', 'Astar', 'DFS', 'BFS' ],
        'Maze Patterns': [ 'Pattern 1', 'Pattern 2', 'Pattern 3' ],
        'Clear Board': [],
        'Clear Path': [],
        'Speed': [ 'Fast', 'Normal', 'Slow' ]
    }

    return (
        <section className="navigation">
            <div className="header">Pathfinding Visualizer</div>
            <div className="navbar">
                <div className="navbar-inner">
                    { Object.entries(navOptions).map( ([ key, value ]) => {
                        return <span className="option" key={key}>
                        { key }
                            { value.length > 0
                                ? <ul className="dropdown">
                                    { value.map( x => <li key={x}>{x}</li>) }
                                </ul>
                                : ''
                            }
                    </span>
                    }) }
                </div>
            </div>
        </section>
    )
}

export default Navigation
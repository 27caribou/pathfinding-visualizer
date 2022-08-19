
const Controls = ({ start, drag, algo, editMode }) => {
    let controls = ['Start', 'Target', 'Weight', 'Wall', 'Visited', 'Shortest-path']
    let description = {
        'dfs': 'Depth-first search (DFS) is an UNWEIGHTED algorithm that expands the deepest node first. Shortest path not guaranteed.',
        'bfs': 'Breadth-first search (BFS) is an UNWEIGHTED algorithm that expands the shallowest node first. Shortest path guaranteed.',
        'ucs': 'BFS finds the shortest path in terms of number of actions. Uniform cost search (UCS) is a WEIGHTED algorithm that finds the least-cost path by expanding the cheapest node first.',
        'greedy': 'Greedy search is a WEIGHTED algorithm that expands the node considered to be closest to the goal by the heuristic. Shortest path not guaranteed.',
        'astar': 'Arguably the best algorithm of the lot. It is a WEIGHTED algorithm that expands the best node in terms of path cost and goal proximity (UCS + Greedy). An admissible and consistent heuristic is required to guarantee an optimal path.'
    }

    return (
        <section className="control-board">
            <div className="legend">
                <h3>Legend</h3>
                <ul className="item-list">
                    { controls.map( x => {
                        return  (
                            <li
                                key={x} className={ !editMode && !['Visited', 'Shortest-path'].includes(x) ? "item disabled" : "item" }
                                onClick={ () => { if ( editMode && !['Visited', 'Shortest-path'].includes(x) ) drag(x.toLowerCase()) } }
                            >
                                <div className="desc">
                                    <span className={ x.toLowerCase() + " symbol" }></span>
                                    {x} Node
                                </div>
                            </li>
                        )
                    }) }
                    <li>
                        <button className="find-path" onClick={ () => editMode && start() }>Find Path!</button>
                    </li>
                </ul>
            </div>
            <p className="algorithm-description">{ description[algo] ? description[algo] : 'Pick an algorithm!' }</p>
        </section>
    )
}

export default Controls
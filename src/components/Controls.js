
const Controls = ({ start, drag, algo }) => {
    let controls = ['Start', 'Target', 'Weight', 'Wall', 'Visited', 'Shortest-path']
    let description = "Pick an algorithm!";
    if ( algo !== '' ) {
        description = algo
    }

    return (
        <section className="control-board">
            <div className="legend">
                <h3>Legend</h3>
                <ul className="item-list">
                    { controls.map( x => {
                        return  (
                            <li
                                key={x} className="item"
                                onClick={ () => { if ( !['Visited', 'Shortest-path'].includes(x) ) drag(x.toLowerCase()) } }
                            >
                                <div className="desc">
                                    <span className={ x.toLowerCase() + " symbol" }></span>
                                    {x} Node
                                </div>
                            </li>
                        )
                    }) }
                    <li>
                        <button className="find-path" onClick={ () => start() }>Find Path!</button>
                    </li>
                </ul>
            </div>
            <p className="algorithm-description">{description}</p>
        </section>
    )
}

export default Controls
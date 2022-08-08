
const Controls = () => {
    let controls = ['Start', 'Target', 'Weight', 'Wall', 'Visited', 'Shortest-path']

    return (
        <section className="control-board">
            <div className="legend">
                <h3>Legend</h3>
                <ul className="item-list">
                    { controls.map( x => {
                        return  (
                            <li key={x} className="item">
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
    )
}

export default Controls
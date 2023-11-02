

const Table = ({ titles, children }) => {
    return (
        <div className="table_container">
            <table className="table is-fullwidth">
                <thead className="is-fullwidth">
                    <tr >
                        {titles.map(item => (
                            <th key={item}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="is-fullwidth">
                    {
                        children
                    }
                </tbody>
            </table>
        </div >
    )
}

export default Table
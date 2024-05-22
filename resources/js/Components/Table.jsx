export default function Table({columns, data}) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 border-left-primary shadow">
            <table className="min-w-full divide-y-2 divide-gray-200 text-lg">
                <thead className="text-left primary-bg white-lg">
                <tr>
                    {
                        columns.map((column, index) => (
                            <th key={index} className="whitespace-nowrap px-4 py-2 font-medium">{column}</th>
                        ))
                    }
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {data.map((row, index) => (
                    <tr
                        key={index}
                    >
                        {
                            Object.values(row).map((cell, index) => (
                                <td
                                    key={index}
                                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {cell}
                                </td>
                            ))
                        }
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

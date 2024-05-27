import { useEffect, useState } from "react"
import SearchForm from "@/Components/SearchForm.jsx"

export default function Table({ columns, data, queryParams, setQueryParams, searchFormExtension = null }) {
    const [totalRows, setTotalRows] = useState(0)

    useEffect(() => {
        setTotalRows(data.length)
    }, [data])

    return (
        <>
            <div className={"mb-4"}>
                <SearchForm
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    searchFormExtension={searchFormExtension}
                />
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200 border-left-primary shadow">
                <table className="min-w-full divide-y-2 divide-gray-200 text-lg">
                    <thead className="text-left primary-bg white-lg">
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className="whitespace-nowrap px-4 py-2 font-medium">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {data.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((cell, index) => (
                                    <td
                                        key={index}
                                        className={
                                            Object.keys(row)[index] === "Description"
                                                ? "whitespace-pre-wrap px-4 py-2 font-medium text-gray-900"
                                                : "whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                        }
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center py-2 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-700">Showing {totalRows} entries</p>
            </div>
        </>
    )
}

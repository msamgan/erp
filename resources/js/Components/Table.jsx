import { useEffect, useState } from "react"
import SearchForm from "@/Components/SearchForm.jsx"

export default function Table({
    columns,
    data,
    queryParams,
    setQueryParams,
    searchFormExtension = null,
    showSearchForm = true
}) {
    const [totalRows, setTotalRows] = useState(0)

    useEffect(() => {
        setTotalRows(data.length)
    }, [data])

    return (
        <>
            {showSearchForm ? (
                <SearchForm
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    extension={searchFormExtension}
                />
            ) : null}

            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow border-left-primary">
                <table className="min-w-full text-lg divide-y-2 divide-gray-200">
                    <thead className="text-left primary-bg white-lg">
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className="px-4 py-2 font-medium whitespace-nowrap">
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
                                                ? "whitespace-pre-wrap px-4 py-2 text-gray-900 font-light"
                                                : "whitespace-nowrap px-4 py-2 text-gray-900 font-light"
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
            <div className="flex items-center justify-between py-2 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-700">Showing {totalRows} entries</p>
            </div>
        </>
    )
}

import { useEffect, useState } from "react"
import SearchForm from "@/Components/SearchForm.jsx"
import { Link } from "@inertiajs/react"
import { appendQueryParamsToUrl } from "@/helpers/methods.js"

export default function Table({
    columns,
    data,
    queryParams,
    setQueryParams,
    searchFormExtension = null,
    showSearchForm = true,
    tdClassName = "",
    totalDataRows = 0,
    from = 0,
    to = 0,
    nextPage = null,
    previousPage = null
}) {
    const [totalRows, setTotalRows] = useState(0)
    const [nextPageLink, setNextPageLink] = useState(null)
    const [previousPageLink, setPreviousPageLink] = useState(null)

    useEffect(() => {
        setTotalRows(data.length)

        if (nextPage) {
            setNextPageLink(appendQueryParamsToUrl(queryParams, nextPage))
        }

        if (previousPage) {
            setPreviousPageLink(appendQueryParamsToUrl(queryParams, previousPage))
        }
    }, [data])

    return (
        <>
            {showSearchForm ? (
                <SearchForm
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    extension={searchFormExtension}
                    searchFormExtension={searchFormExtension}
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
                                            "whitespace-nowrap px-4 py-2 text-gray-900 font-light " +
                                            tdClassName
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
            <div className="flex items-center justify-between py-2 border-t border-gray-200">
                <p className="text-sm text-gray-700">
                    Showing {totalRows} entries{" "}
                    {totalDataRows > 0 ? `of ${totalDataRows} | from ${from} to ${to}` : ""}
                </p>

                <div className="flex items-center space-x-2">
                    {previousPage && (
                        <Link
                            href={previousPageLink}
                            className="px-3 py-1 text-sm text-white bg-teal-800 rounded-lg"
                        >
                            Previous
                        </Link>
                    )}
                    {nextPage && (
                        <Link
                            href={nextPageLink}
                            className="px-3 py-1 text-sm text-white bg-teal-800 rounded-lg"
                        >
                            Next
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}

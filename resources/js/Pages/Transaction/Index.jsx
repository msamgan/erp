import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import PrimaryLink from "@/Components/PrimaryLink.jsx"
import { useEffect, useState } from "react"
import { appendQueryParamsToUrl } from "@/helpers/methods.js"

export default function Index({ auth, transactions }) {
    const [columns, setColumns] = useState(["Description", "Type", "Amount", "Project", "Date"])
    const [data, setData] = useState([])
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [queryParams, setQueryParams] = useState(
        Object.fromEntries(new URLSearchParams(window.location.search).entries())
    )

    const createTypeAttribute = (type) => {
        return (
            <div className="flex space-x-1">
                {type === "incoming" ? (
                    <span className="px-2 py-1 text-sm text-green-800 bg-green-200 rounded-full">Incoming</span>
                ) : (
                    ""
                )}
                {type === "outgoing" ? (
                    <span className="px-2 py-1 text-sm text-yellow-800 bg-yellow-200 rounded-full">
                        Outgoing
                    </span>
                ) : (
                    ""
                )}
            </div>
        )
    }

    const createDateAttribute = (date) => {
        return <div className="flex space-x-1">{date ? new Date(date).toDateString() : ""}</div>
    }

    const createAmountAttribute = (amount) => {
        return amount.toLocaleString("en-US", { style: "currency", currency: "USD" })
    }

    useEffect(() => {
        let income = 0
        let expense = 0

        setData(
            transactions.data.map((transaction) => {
                if (transaction.type === "incoming") {
                    income += transaction.amount
                }

                if (transaction.type === "outgoing") {
                    expense += transaction.amount
                }

                return {
                    Description: transaction.description,
                    Type: createTypeAttribute(transaction.type),
                    Amount: createAmountAttribute(transaction.amount),
                    Project: transaction.project ? transaction.project.name : "",
                    Date: createDateAttribute(transaction.date)
                }
            })
        )

        setTotalIncome(income)
        setTotalExpense(expense)
    }, [])

    const searchFormExtension = () => {
        return (
            <>
                <div className="flex flex-col">
                    <input
                        type="date"
                        name="startDate"
                        placeholder=""
                        value={queryParams.startDate}
                        onChange={(e) => setQueryParams({ ...queryParams, startDate: e.target.value })}
                        className="h-10 px-2 border border-gray-300 rounded-md"
                    />
                    <small className="text-gray-500 ml-2 mt-0.5">start date</small>
                </div>
                <div className="flex flex-col">
                    <input
                        type="date"
                        name="endDate"
                        placeholder=""
                        value={queryParams.endDate}
                        onChange={(e) => setQueryParams({ ...queryParams, endDate: e.target.value })}
                        className="h-10 px-2 border border-gray-300 rounded-md"
                    />
                    <small className="text-gray-500 ml-2 mt-0.5">end date</small>
                </div>
                <div className="flex flex-col">
                    <select
                        id="type"
                        name={"type"}
                        className="h-10 border border-gray-300 rounded-md"
                        defaultValue={queryParams.type}
                    >
                        <option key={"all"} value={"all"}>
                            {"All"}
                        </option>
                        <option key={"incoming"} value={"incoming"}>
                            {"Incoming"}
                        </option>
                        <option key={"outgoing"} value={"outgoing"}>
                            {"Outgoing"}
                        </option>
                    </select>
                    <small className="text-gray-500 ml-2 mt-0.5">type</small>
                </div>
            </>
        )
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Transactions" />}
            subMenu={
                <div className="flex space-x-2">
                    <PrimaryLink className={"h-8"} title="Add Transaction" href={route("transaction.create")} />
                </div>
            }
        >
            <Head title="Transactions" />

            <Main>
                <Table
                    columns={columns}
                    data={data}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    searchFormExtension={searchFormExtension}
                    totalDataRows={transactions.total}
                    from={transactions.from}
                    to={transactions.to}
                    nextPage={transactions.next_page_url}
                    previousPage={transactions.prev_page_url}
                />
                <div className="flex justify-between">
                    <div className="flex space-x-2">
                        <span className="px-2 py-1 text-lg bg-green-200 rounded-full">
                            Total Income: {createAmountAttribute(totalIncome)}
                        </span>
                        <span className="px-2 py-1 ml-3 text-lg bg-yellow-200 rounded-full">
                            Total Expense: {createAmountAttribute(totalExpense)}
                        </span>
                    </div>
                </div>
            </Main>
        </AuthenticatedLayout>
    )
}

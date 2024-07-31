import { useEffect, useState } from "react"
import {
    createCostingAttribute,
    createStatusAttribute,
    createTypeAttribute as createProjectTypeAttribute
} from "@/Pages/Project/partials.jsx"
import { createDateAttribute } from "@/helpers/methods.js"
import Table from "@/Components/Table.jsx"

export default function Details({ project }) {
    const [columns, setColumns] = useState(["Description", "Type", "Amount", "Date"])
    const [data, setData] = useState([])

    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [totalPending, setTotalPending] = useState(0)
    const [profit, setProfit] = useState(0)

    const InfoCard = ({ label, value }) => {
        return (
            <div>
                <label htmlFor={label} className="block text-sm font-medium text-gray-500">
                    {label}
                </label>
                <p className="mt-1.5 text-lg text-black">{value}</p>
            </div>
        )
    }

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

    useEffect(() => {
        if (!project.transactions) return

        setData(
            project.transactions.map((transaction) => {
                return {
                    Description: transaction.description,
                    Type: createTypeAttribute(transaction.type),
                    Amount: createCostingAttribute(transaction.amount),
                    Date: createDateAttribute(transaction.date)
                }
            })
        )

        let income = project.transactions
            .filter((transaction) => transaction.type === "incoming")
            .reduce((acc, transaction) => acc + transaction.amount, 0)

        let expense = project.transactions
            .filter((transaction) => transaction.type === "outgoing")
            .reduce((acc, transaction) => acc + transaction.amount, 0)

        setTotalIncome(income)
        setTotalExpense(expense)

        let profit = income - expense
        setProfit(profit)

        let pending = project.costing - (income - expense)

        setTotalPending(pending)
    }, [project])

    return (
        <div className="p-4 shadow sm:rounded-lg border-left-primary">
            <section>
                <header>
                    <h1 className="text-xl font-medium text-gray-900">{project.name}</h1>
                    {project.document_url ? (
                        <a
                            href={project.document_url}
                            target="_blank"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            View Doc
                        </a>
                    ) : null}
                </header>

                <div className="mt-4">
                    <div className="grid gap-6 gap-y-8 sm:grid-cols-3">
                        <InfoCard label="Client" value={project.client.name} />
                        <InfoCard label="Description" value={project.description} />
                        <InfoCard label="Status" value={createStatusAttribute(project.status)} />
                        <InfoCard label="Start Date" value={createDateAttribute(project.start_date)} />
                        <InfoCard label="End Date" value={createDateAttribute(project.end_date)} />
                        <InfoCard label="Costing" value={createCostingAttribute(project.costing)} />
                        <InfoCard label="Type" value={createProjectTypeAttribute(project.type)} />
                    </div>
                </div>
            </section>

            {project.transactions?.length === 0 ? (
                ""
            ) : (
                <section className="mt-8">
                    <header>
                        <h2 className="mb-4 text-lg font-medium text-gray-900">Transactions</h2>
                    </header>

                    <Table columns={columns} data={data} showSearchForm={false} />
                </section>
            )}

            <section className="mt-8">
                <header>
                    <h2 className="mb-4 text-lg font-medium text-gray-900">Financial Summary</h2>
                </header>

                <div className="grid gap-y-5 sm:grid-cols-3">
                    <InfoCard label="Total Income" value={createCostingAttribute(totalIncome)} />
                    <InfoCard label="Total Expense" value={createCostingAttribute(totalExpense)} />
                    <InfoCard label="Total Pending" value={createCostingAttribute(totalPending)} />
                    <InfoCard label="Profit" value={createCostingAttribute(profit)} />
                </div>
            </section>
        </div>
    )
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import { useEffect, useState } from "react"
import Table from "@/Components/Table.jsx"

export default function Show({ auth, project }) {
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

    const createStatusBadge = (status) => {
        let color = "bg-gray-200"

        if (status === "lead") {
            color = "lead-badges-background"
        } else if (status === "active") {
            color = "active-badge-background"
        } else if (status === "completed") {
            color = "complete-badge-background"
        } else if (status === "cancelled") {
            color = "cancelled-badge-background"
        }

        return (
            <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-lg font-medium ${color}`}
            >
                {status}
            </span>
        )
    }

    const createDateAttribute = (date) => {
        if (date) {
            return new Date(date).toDateString()
        }

        return "-"
    }

    const createCostingAttribute = (costing) => {
        return costing.toLocaleString("en-US", { style: "currency", currency: "USD" })
    }

    const createTypeAttribute = (type) => {
        return (
            <div className="flex space-x-1">
                {type === "incoming" ? (
                    <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-sm">Incoming</span>
                ) : (
                    ""
                )}
                {type === "outgoing" ? (
                    <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">
                        Outgoing
                    </span>
                ) : (
                    ""
                )}
            </div>
        )
    }

    useEffect(() => {
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
    }, [])

    return (
        <AuthenticatedLayout user={auth.user} header={<HeaderTitle title="Project Details" />}>
            <Head title="Project Details" />

            <Main>
                <div className="shadow p-4 sm:rounded-lg border-left-primary">
                    <section>
                        <header>
                            <h1 className="text-xl font-medium text-gray-900">{project.name}</h1>
                        </header>

                        <div className="mt-4">
                            <div className="grid gap-y-5 sm:grid-cols-3">
                                <InfoCard label="Client" value={project.client.name} />
                                <InfoCard label="Description" value={project.description} />
                                <InfoCard
                                    label="Document URL"
                                    value={
                                        <a
                                            href={project.document_url}
                                            target="_blank"
                                            className="text-blue-500 hover:underline"
                                        >
                                            View Doc
                                        </a>
                                    }
                                />
                                <InfoCard label="Status" value={createStatusBadge(project.status)} />
                                <InfoCard label="Start Date" value={createDateAttribute(project.start_date)} />
                                <InfoCard label="End Date" value={createDateAttribute(project.end_date)} />
                                <InfoCard label="Costing" value={createCostingAttribute(project.costing)} />
                            </div>
                        </div>
                    </section>

                    {project.transactions.length === 0 ? (
                        ""
                    ) : (
                        <section className="mt-8">
                            <header>
                                <h2 className="text-lg mb-4 font-medium text-gray-900">Transactions</h2>
                            </header>

                            <Table columns={columns} data={data} />
                        </section>
                    )}

                    <section className="mt-8">
                        <header>
                            <h2 className="text-lg mb-4 font-medium text-gray-900">Financial Summary</h2>
                        </header>

                        <div className="grid gap-y-5 sm:grid-cols-3">
                            <InfoCard label="Total Income" value={createCostingAttribute(totalIncome)} />
                            <InfoCard label="Total Expense" value={createCostingAttribute(totalExpense)} />
                            <InfoCard label="Total Pending" value={createCostingAttribute(totalPending)} />
                            <InfoCard label="Profit" value={createCostingAttribute(profit)} />
                        </div>
                    </section>
                </div>
            </Main>
        </AuthenticatedLayout>
    )
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import HeaderTitle from "@/Components/HeaderTitle.jsx";
import {Head} from "@inertiajs/react";
import Main from "@/Components/Main.jsx";
import Table from "@/Components/Table.jsx";
import PrimaryLink from "@/Components/PrimaryLink.jsx";
import {useEffect, useState} from "react";

export default function Index({auth, transactions}) {
    const [columns, setColumns] = useState(['Description', 'Type', 'Amount', 'Project', 'Date']);
    const [data, setData] = useState([]);

    const createTypeAttribute = (type) => {
        return (<div className="flex space-x-1">
            {type === 'incoming' ? <span
                className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-sm">Incoming</span> : ''}
            {type === 'outgoing' ? <span
                className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">Outgoing</span> : ''}
        </div>)
    }

    const createDateAttribute = (date) => {
        return (
            <>
                <div className="flex space-x-1">
                    {date ? new Date(date).toDateString() : ''}
                </div>
            </>
        )
    }

    const createAmountAttribute = (amount) => {
        return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    }

    useEffect(() => {
        setData(transactions.map(transaction => {
            return {
                Description: transaction.description,
                Type: createTypeAttribute(transaction.type),
                Amount: createAmountAttribute(transaction.amount),
                Project: transaction.project ? transaction.project.name : '',
                Date: createDateAttribute(transaction.date)
            }
        }));
    }, []);

    return (<AuthenticatedLayout
        user={auth.user}
        header={<HeaderTitle title="Transactions"/>}
        subMenu={<div className="flex space-x-2">
            <PrimaryLink className={'h-8'} title="Add Transaction" href={route('transaction.create')}/>
        </div>}
    >
        <Head title="Transactions"/>

        <Main>
            <Table columns={columns} data={data}/>
        </Main>

    </AuthenticatedLayout>)
}

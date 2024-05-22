import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import HeaderTitle from "@/Components/HeaderTitle.jsx";
import {Head} from "@inertiajs/react";
import Main from "@/Components/Main.jsx";
import Table from "@/Components/Table.jsx";
import PrimaryLink from "@/Components/PrimaryLink.jsx";
import {useEffect, useState} from "react";
import EditLink from "@/Components/EditLink.jsx";

export default function Index({auth, projects}) {
    const [columns, setColumns] = useState(['Name', 'Client', 'Description', 'Status', 'Dates', 'Costing', 'Actions']);
    const [data, setData] = useState([]);

    const createActions = ({editRoute}) => {
        return (<div className="flex space-x-2">
            <EditLink editRoute={editRoute}/>
        </div>)
    }

    const createNameAttribute = (name, docUrl) => {
        return (<div className="flex flex-col space-y-1">
            <div>{name}</div>
            {docUrl ? <a href={docUrl} target="_blank" className="text-blue-500">View Doc</a> : ''}
        </div>)
    }

    const createStatusAttribute = (status) => {
        return (<div className="flex space-x-1">
            {status === 'completed' ? <span
                className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-sm">Completed</span> : ''}
            {status === 'active' ? <span
                className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">Active</span> : ''}
            {status === 'lead' ?
                <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-sm">Lead</span> : ''}
        </div>)
    }

    const createDateAttribute = (startDate, endDate) => {
        return (
            <>
                <div
                    className="flex space-x-1">
                    Start Date: {startDate ? new Date(startDate).toDateString() : ''}</div>
                <div
                    className="flex space-x-1">
                    End Date: {endDate ? new Date(endDate).toDateString() : ''}</div>
            </>
        )
    }

    const createCostingAttribute = (costing) => {
        return costing.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    }

    useEffect(() => {
        setData(projects.map(project => {
            return {
                Name: createNameAttribute(project.name, project.document_url),
                Client: project.client.name,
                Description: project.description,
                Status: createStatusAttribute(project.status),
                Dates: createDateAttribute(project.start_date, project.end_date),
                Costing: createCostingAttribute(project.costing),
                Actions: createActions({editRoute: route('project.edit', project.id)})
            }
        }));
    }, []);

    return (<AuthenticatedLayout
        user={auth.user}
        header={<HeaderTitle title="Projects"/>}
        subMenu={<div className="flex space-x-2">
            <PrimaryLink className={'h-8'} title="Add Project" href={route('project.create')}/>
        </div>}
    >
        <Head title="Projects"/>

        <Main>
            <Table columns={columns} data={data}/>
        </Main>

    </AuthenticatedLayout>)
}

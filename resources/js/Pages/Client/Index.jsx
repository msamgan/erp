import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import HeaderTitle from "@/Components/HeaderTitle.jsx";
import {Head} from "@inertiajs/react";
import Main from "@/Components/Main.jsx";
import Table from "@/Components/Table.jsx";
import PrimaryLink from "@/Components/PrimaryLink.jsx";
import {useEffect, useState} from "react";
import EditLink from "@/Components/EditLink.jsx";

export default function Index({auth, clients}) {
    const [columns, setColumns] = useState(['Name', 'Emails', 'Phones', 'Organization', 'Actions']);
    const [data, setData] = useState([]);

    const createActions = ({editRoute}) => {
        return (
            <div className="flex space-x-2">
                <EditLink editRoute={editRoute}/>
            </div>
        )
    }

    useEffect(() => {
        setData(clients.map(client => {
            return {
                Name: client.name,
                Emails: client.emails.map(email => email.email).join(', '),
                Phones: client.phones.map(phone => phone.phone).join(', '),
                Organization: client.organization ? client.organization.name : '',
                Actions: createActions({
                    editRoute: route('client.edit', client.id)
                })
            }
        }));
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Clients"/>}
            subMenu={
                <div className="flex space-x-2">
                    <PrimaryLink className={'h-8'} title="Add Client" href={route('client.create')}/>
                </div>
            }
        >
            <Head title="Clients"/>

            <Main>
                <Table columns={columns} data={data}/>
            </Main>

        </AuthenticatedLayout>
    )
}

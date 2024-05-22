import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import HeaderTitle from "@/Components/HeaderTitle.jsx";
import {Head, useForm} from "@inertiajs/react";
import Main from "@/Components/Main.jsx";
import Form from "@/Pages/Project/Form.jsx";
import {useCallback, useEffect, useState} from "react";
import FormSection from "@/Components/FormSection.jsx";

export default function Create({auth, project}) {
    const [clients, setClients] = useState([]);

    const clientList = useCallback(() => {
        axios(route('client.list')).then(response => {
            setClients(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    const refreshClientList = () => {
        clientList();
    }

    useEffect(() => {
        clientList();
    }, []);

    const dataObject = {
        name: project.name,
        client: project.client.name,
        description: project.description,
        document_url: project.document_url,
        status: project.status,
        start_date: project.start_date,
        end_date: project.end_date,
        costing: project.costing,
    }

    const {data, setData, errors, post, processing, recentlySuccessful} = useForm(dataObject);

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('project.update', project.id), {
            preserveScroll: true,
            onSuccess: () => {
                //
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Edit Project"/>}
        >
            <Head title="Edit Project"/>

            <Main>
                <FormSection
                    headerTitle="Project Information"
                    headerDescription="Update an existing Project with It's information."
                >
                    <Form
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        recentlySuccessful={recentlySuccessful}
                        onSubmit={onSubmit}
                        clients={clients}
                        refreshClientList={refreshClientList}
                    />
                </FormSection>
            </Main>

        </AuthenticatedLayout>
    )
}

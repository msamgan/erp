import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import PrimaryLink from "@/Components/PrimaryLink.jsx"
import { useEffect, useState } from "react"
import EditLink from "@/Components/EditLink.jsx"

export default function Index({ auth, todayTask, tomorrowTask, restTasks }) {
    const [columns, setColumns] = useState(["Name", "Project", "Due Date", "Actions"])
    const [todayTaskData, setTodayTaskData] = useState([])
    const [tomorrowTaskData, setTomorrowTaskData] = useState([])
    const [restTaskData, setRestTaskData] = useState([])

    const createDateAttribute = (date) => {
        return  date
        // return <div className="flex space-x-1">{date ? new Date(date).toDateString() : ""}</div>
    }

    const createNameAttribute = (name, description) => {
        return (
            <div className="flex flex-col space-y-1">
                {description ? (
                    <div className="has-tooltip">
                        <span className="w-1/3 p-2 -mt-16 text-white bg-black rounded shadow-lg tooltip text-wrap">
                            {description}
                        </span>
                        {name}
                    </div>
                ) : (
                    <div>{name}</div>
                )}
            </div>
        )
    }

    useEffect(() => {
        setTodayTaskData(
            todayTask.map((task) => {
                return {
                    Name: createNameAttribute(task.name, task.description),
                    Project: task.project ? task.project.name : "",
                    "Due Date": createDateAttribute(task.due_date),
                    Actions: (
                        <div className="flex space-x-2">
                            <EditLink editRoute={route("task.edit", task.id)} />
                        </div>
                    )
                }
            })
        )

        setTomorrowTaskData(
            tomorrowTask.map((task) => {
                return {
                    Name: createNameAttribute(task.name, task.description),
                    Project: task.project ? task.project.name : "",
                    "Due Date": createDateAttribute(task.due_date),
                    Actions: (
                        <div className="flex space-x-2">
                            <EditLink editRoute={route("task.edit", task.id)} />
                        </div>
                    )
                }
            })
        )

        setRestTaskData(
            restTasks.map((task) => {
                return {
                    Name: createNameAttribute(task.name, task.description),
                    Project: task.project ? task.project.name : "",
                    "Due Date": createDateAttribute(task.due_date),
                    Actions: (
                        <div className="flex space-x-2">
                            <EditLink editRoute={route("task.edit", task.id)} />
                        </div>
                    )
                }
            })
        )
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Tasks" />}
            subMenu={
                <div className="flex space-x-2">
                    <PrimaryLink className={"h-8"} title="Add Task" href={route("task.create")} />
                </div>
            }
        >
            <Head title="Tasks" />

            <Main>
                <Table
                    columns={columns}
                    data={todayTaskData}
                    showSearchForm={false}
                    title={'Today\'s Tasks'}
                />
                <span className="block h-6"></span>
                <Table
                    columns={columns}
                    data={tomorrowTaskData}
                    showSearchForm={false}
                    title={'Tomorrow\'s Tasks'}
                />
                <span className="block h-6"></span>
                <Table
                    columns={columns}
                    data={restTaskData}
                    showSearchForm={false}
                    title={'Rest of the Tasks'}
                />
            </Main>
        </AuthenticatedLayout>
    )
}

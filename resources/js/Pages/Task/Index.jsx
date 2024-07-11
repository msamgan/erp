import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import { useCallback, useEffect, useState } from "react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import CheckedTable from "@/Components/CheckedTable.jsx"
import axios from "axios"
import { createDateAttribute } from "@/helpers/methods.js"
import { pageDataObject, taskDataObject } from "@/Pages/Task/methods.js"
import Drawer from "@/Components/Drawer.jsx"
import FormSection from "@/Components/FormSection.jsx"
import Form from "@/Pages/Task/Form.jsx"
import DrawerButton from "@/Components/DrawerButton.jsx"
import DrawerEditButton from "@/Components/DrawerEditButton.jsx"

export default function Index({ auth }) {
    const [columns, setColumns] = useState(["Name", "Project", "Due Date", "Actions"])
    const [todayTaskData, setTodayTaskData] = useState([])
    const [tomorrowTaskData, setTomorrowTaskData] = useState([])
    const [restTaskData, setRestTaskData] = useState([])
    const [checked, setChecked] = useState([])
    const [openDrawer, setOpenDrawer] = useState(false)
    const [projects, setProjects] = useState([])
    const [task, setTask] = useState(null)

    const projectList = useCallback(() => {
        axios(route("project.list"))
            .then((response) => {
                setProjects(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const getTasks = () => {
        axios
            .get(route("task.list"))
            .then((response) => {
                const todayTask = response.data.todayTasks
                const tomorrowTask = response.data.tomorrowTasks
                const restTasks = response.data.restTasks

                setTodayTaskData(
                    todayTask.map((task) => {
                        return {
                            ID: task.id,
                            Name: createNameAttribute(task.name, task.description),
                            Project: task.project ? task.project.name : "",
                            "Due Date": createDateAttribute(task.due_date),
                            Actions: (
                                <div className="flex space-x-2">
                                    <DrawerEditButton
                                        onClick={() => {
                                            axios
                                                .get(route("task.show", task.id))
                                                .then((response) => {
                                                    setTask(response.data)
                                                    setData(taskDataObject(response.data))
                                                    setPageData(pageDataObject(response.data))
                                                    setOpenDrawer(true)
                                                })
                                                .catch((error) => {
                                                    console.log(error)
                                                })
                                        }}
                                    />
                                </div>
                            )
                        }
                    })
                )

                setTomorrowTaskData(
                    tomorrowTask.map((task) => {
                        return {
                            ID: task.id,
                            Name: createNameAttribute(task.name, task.description),
                            Project: task.project ? task.project.name : "",
                            "Due Date": createDateAttribute(task.due_date),
                            Actions: (
                                <div className="flex space-x-2">
                                    <DrawerEditButton
                                        onClick={() => {
                                            axios
                                                .get(route("task.show", task.id))
                                                .then((response) => {
                                                    setTask(response.data)
                                                    setData(taskDataObject(response.data))
                                                    setPageData(pageDataObject(response.data))
                                                    setOpenDrawer(true)
                                                })
                                                .catch((error) => {
                                                    console.log(error)
                                                })
                                        }}
                                    />
                                </div>
                            )
                        }
                    })
                )

                setRestTaskData(
                    restTasks.map((task) => {
                        return {
                            ID: task.id,
                            Name: createNameAttribute(task.name, task.description),
                            Project: task.project ? task.project.name : "",
                            "Due Date": createDateAttribute(task.due_date),
                            Actions: (
                                <div className="flex space-x-2">
                                    <DrawerEditButton
                                        onClick={() => {
                                            axios
                                                .get(route("task.show", task.id))
                                                .then((response) => {
                                                    setTask(response.data)
                                                    setData(taskDataObject(response.data))
                                                    setPageData(pageDataObject(response.data))
                                                    setOpenDrawer(true)
                                                })
                                                .catch((error) => {
                                                    console.log(error)
                                                })
                                        }}
                                    />
                                </div>
                            )
                        }
                    })
                )
            })
            .catch((error) => {
                console.log(error)
            })
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

    const dataObject = taskDataObject(task)

    const { data, setData, errors, post, processing, recentlySuccessful } = useForm(dataObject)

    const [pageData, setPageData] = useState(pageDataObject(task))

    const onSubmit = (e) => {
        e.preventDefault()
        post(pageData.actionUrl, {
            preserveScroll: true,
            onSuccess: () => {
                if (!task) {
                    axios
                        .get(route("task.last_created"))
                        .then((response) => {
                            setTask(response.data)
                            setData(taskDataObject(response.data))
                            setPageData(pageDataObject(response.data))
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }

                getTasks()
            }
        })
    }

    useEffect(() => {
        projectList()
        getTasks()
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Tasks" />}
            subMenu={
                <div className="flex space-x-2">
                    {/*<PrimaryLink className={"h-8"} title="Add Task" href={route("task.create")} />*/}
                    <DrawerButton
                        title="Add Task"
                        onClick={() => {
                            setData(taskDataObject(null))
                            setOpenDrawer(true)
                        }}
                    />
                </div>
            }
        >
            <Head title="Tasks" />

            <Main>
                <div className="flex flex-col">
                    <div>
                        <PrimaryButton
                            disabled={checked.length <= 0}
                            title="Mark as Completed"
                            className={"mb-6 float-end"}
                            onClick={() => {
                                axios
                                    .post(route("task.complete"), {
                                        task_ids: checked
                                    })
                                    .then((response) => {
                                        getTasks()
                                        setChecked([])
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                            }}
                        >
                            Mark as Completed
                        </PrimaryButton>
                    </div>
                    <div>
                        <CheckedTable
                            columns={columns}
                            data={todayTaskData}
                            showSearchForm={false}
                            title={"Today's Tasks"}
                            checked={checked}
                            setChecked={setChecked}
                        />
                        <span className="block h-6"></span>

                        <CheckedTable
                            columns={columns}
                            data={tomorrowTaskData}
                            showSearchForm={false}
                            title={"Tomorrow's Tasks"}
                            checked={checked}
                            setChecked={setChecked}
                        />
                        <span className="block h-6"></span>
                        <CheckedTable
                            columns={columns}
                            data={restTaskData}
                            showSearchForm={false}
                            title={"Rest of the Tasks"}
                            checked={checked}
                            setChecked={setChecked}
                        />
                    </div>
                    <Drawer open={openDrawer} side="right" setOpen={setOpenDrawer}>
                        <FormSection
                            headerTitle={pageData.headerTitle}
                            headerDescription={pageData.description}
                        >
                            <Form
                                data={data}
                                setData={setData}
                                errors={errors}
                                processing={processing}
                                recentlySuccessful={recentlySuccessful}
                                onSubmit={onSubmit}
                                projects={projects}
                                refreshProjectList={projectList}
                            />
                        </FormSection>
                    </Drawer>
                </div>
            </Main>
        </AuthenticatedLayout>
    )
}

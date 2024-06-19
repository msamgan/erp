import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import PrimaryLink from "@/Components/PrimaryLink.jsx"
import { useEffect, useState } from "react"
import EditLink from "@/Components/EditLink.jsx"
import axios from "axios"
import { createDateAttribute } from "@/helpers/methods.js"

export default function Index({ auth, posts }) {
    const [columns, setColumns] = useState(["Title", "Status", "Actions"])
    const [data, setData] = useState([])
    const [queryParams, setQueryParams] = useState(
        Object.fromEntries(new URLSearchParams(window.location.search).entries())
    )

    const createActions = ({ editRoute, deleteRoute }) => {
        return (
            <div className="flex space-x-2">
                <EditLink editRoute={editRoute} />
                <button
                    className="p-1 ml-4 text-red-500 bg-red-100 rounded-full"
                    onClick={() => {
                        if (confirm("Are you sure you want to delete this post?")) {
                            axios.delete(deleteRoute).then(() => {
                                window.location.reload()
                            })
                        }
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>
                </button>
            </div>
        )
    }

    const createTitleAttribute = (title, excerpt, tags, featured_image) => {
        return (
            <div className="flex gap-6 space-x-3">
                <div className="mt-2">
                    <img
                        src={
                            featured_image
                                ? featured_image
                                : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
                        }
                        className="w-16 h-16 rounded-full"
                    />
                </div>
                <div>
                    <div className="font-semibold">{title}</div>
                    {excerpt ? (
                        <div className="text-sm text-gray-500">{excerpt.substring(0, title.length)}...</div>
                    ) : null}
                    {tags.length > 0 ? (
                        <div className="mt-3 text-sm text-gray-500 space-x-3">
                            {tags.map((tag) => {
                                return (
                                    <span
                                        key={tag.id}
                                        className="px-2 py-1 text-gray-900 bg-gray-200 rounded-full"
                                    >
                                        {tag.name}
                                    </span>
                                )
                            })}
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }

    const createStatusAttribute = (status, publishedAt) => {
        return (
            <div className="flex flex-col space-y-1">
                <div
                    className={`py-2 rounded-full text-sm ${
                        status === "published" ? "text-green-800" : "text-gray-800"
                    }`}
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
                {status === "published" ? (
                    <>
                        <span className="text-xs text-gray-500">on {createDateAttribute(publishedAt)}</span>
                    </>
                ) : null}
            </div>
        )
    }

    const searchFormExtension = () => {
        return (
            <div className="flex flex-col">
                <select
                    id="status"
                    name={"status"}
                    className="h-10 border border-gray-300 rounded-md"
                    defaultValue={queryParams.status}
                >
                    <option key={"all"} value={"all"}>
                        {"All"}
                    </option>
                    <option key={"draft"} value={"draft"}>
                        {"Draft"}
                    </option>
                    <option key={"published"} value={"published"}>
                        {"Published"}
                    </option>
                </select>
                <small className="text-gray-500 ml-2 mt-0.5">status</small>
            </div>
        )
    }

    useEffect(() => {
        setData(
            posts.data.map((post) => {
                return {
                    Title: createTitleAttribute(post.title, post.excerpt, post.tags, post.featured_image),
                    Status: createStatusAttribute(post.status, post.published_at),
                    Actions: createActions({
                        editRoute: route("post.edit", post.id),
                        deleteRoute: route("post.destroy", post.id)
                    })
                }
            })
        )
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Posts" />}
            subMenu={
                <div className="flex space-x-2">
                    <PrimaryLink className={"h-8"} title="Add Post" href={route("post.create")} />
                </div>
            }
        >
            <Head title="Posts" />

            <Main>
                <Table
                    columns={columns}
                    data={data}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    searchFormExtension={searchFormExtension}
                    totalDataRows={posts.total}
                    from={posts.from}
                    to={posts.to}
                    nextPage={posts.next_page_url}
                    previousPage={posts.prev_page_url}
                />
            </Main>
        </AuthenticatedLayout>
    )
}

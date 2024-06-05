import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import PrimaryLink from "@/Components/PrimaryLink.jsx"
import { useEffect, useState } from "react"
import EditLink from "@/Components/EditLink.jsx"

export default function Index({ auth, posts }) {
    const [columns, setColumns] = useState(["Featured Image", "Title", "Excerpt", "Status", "Actions"])
    const [data, setData] = useState([])
    const [queryParams, setQueryParams] = useState(
        Object.fromEntries(new URLSearchParams(window.location.search).entries())
    )

    const createActions = ({ editRoute }) => {
        return (
            <div className="flex space-x-2">
                <EditLink editRoute={editRoute} />
            </div>
        )
    }

    useEffect(() => {
        setData(
            posts.map((post) => {
                return {
                    FeaturedImage: (
                        <img
                            src={
                                post.featured_image !== "undefined"
                                    ? post.featured_image
                                    : "https://fakeimg.pl/200x200"
                            }
                            className="h-8 w-8"
                        />
                    ),
                    Title: post.title,
                    Excerpt: post.excerpt,
                    Status: post.status,
                    Actions: createActions({
                        editRoute: route("post.edit", post.id)
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
                />
            </Main>
        </AuthenticatedLayout>
    )
}

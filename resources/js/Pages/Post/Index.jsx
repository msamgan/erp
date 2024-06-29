import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Table from "@/Components/Table.jsx"
import PrimaryLink from "@/Components/PrimaryLink.jsx"
import { useCallback, useEffect, useRef, useState } from "react"
import EditLink from "@/Components/EditLink.jsx"
import axios from "axios"
import { createDateAttribute } from "@/helpers/methods.js"
import alertify from "alertifyjs"
import Form from "@/Pages/Post/Form.jsx"

import EditorJS from "@editorjs/editorjs"
import Header from "@editorjs/header"
import Paragraph from "@editorjs/paragraph"
import CodeTool from "@editorjs/code"
import List from "@editorjs/list"
import InlineCode from "@editorjs/inline-code"
import Quote from "@editorjs/quote"
import Delimiter from "@editorjs/delimiter"
import InlineImage from "editorjs-inline-image"
import YoutubeEmbed from "editorjs-youtube-embed"

import "./editor.css"
import { pageDataObject, postDataObject } from "@/Pages/Post/methods.js"
import Drawer from "@/Components/Drawer.jsx"
import FormSection from "@/Components/FormSection.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import DrawerButton from "@/Components/DrawerButton.jsx"

export default function Index({ auth, posts, postData }) {
    const [columns, setColumns] = useState(["Title", "Status", "Actions"])
    const [listingData, setListingData] = useState([])
    const [queryParams, setQueryParams] = useState(
        Object.fromEntries(new URLSearchParams(window.location.search).entries())
    )

    const DeleteButton = ({ deleteRoute }) => {
        return (
            <button
                className="p-1 ml-4 text-red-500 bg-red-100 rounded-full"
                onClick={() => {
                    alertify.confirm(
                        "Are you sure?",
                        "Are you sure you want to delete this post? This action cannot be undone.",
                        function () {
                            axios.delete(deleteRoute).then(() => {
                                window.location.reload()
                            })
                        },
                        function () {
                            // alertify.error("Cancel")
                        }
                    )
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
        )
    }

    const createActions = ({ editRoute, deleteRoute }) => {
        return (
            <div className="flex space-x-2">
                <EditLink editRoute={editRoute} />
                <DeleteButton deleteRoute={deleteRoute} />
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
                        alt={title}
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

    const dataObject = postDataObject(postData)

    const { data, setData } = useForm(dataObject)

    const [processing, setProcessing] = useState(false)
    const [recentlySuccessful, setRecentlySuccessful] = useState(false)
    const [errors, setErrors] = useState({})

    const [pageData, setPageData] = useState(pageDataObject(postData))

    const [tagList, setTagList] = useState([])
    const [content, setContent] = useState(postData ? postData.content : {})
    const editor = useRef(null)

    const [openDrawer, setOpenDrawer] = useState(false)

    const getTagList = useCallback(() => {
        axios.get(route("api.tag.list")).then((response) => {
            setTagList(response.data)
        })
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()

        setProcessing(true)

        if (data.title === "") {
            setErrors({
                title: "The title field is required."
            })
            setProcessing(false)
            return
        }

        if (data.excerpt === "") {
            setErrors({
                excerpt: "The excerpt field is required."
            })
            setProcessing(false)
            return
        }

        if (Object.keys(content).length === 0) {
            setErrors({
                content: "The content field is required."
            })
            setProcessing(false)
            return
        }

        let formData = {
            ...data,
            content: content
        }

        axios
            .post(pageData.actionUrl, formData)
            .then((response) => {
                setProcessing(false)
                setRecentlySuccessful(true)

                setTimeout(() => {
                    setRecentlySuccessful(false)
                }, 5000)

                if (!postData) {
                    axios.get(route("api.post.latest")).then((response) => {
                        // window.history.pushState({}, "", route("post.edit", response.data.id))
                        setPageData(pageDataObject(response.data))
                        setData(postDataObject(response.data))
                    })
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    const initEditor = () => {
        return new EditorJS({
            holder: "editor",
            placeholder: "Let`s write an awesome story!",
            tools: {
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true
                },
                header: Header,
                code: CodeTool,
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: "unordered"
                    }
                },
                inlineCode: {
                    class: InlineCode,
                    shortcut: "CMD+SHIFT+M"
                },
                quote: Quote,
                image: {
                    class: InlineImage,
                    inlineToolbar: true,
                    config: {
                        embed: {
                            display: true
                        },
                        unsplash: {
                            appName: "CodeBySamgan",
                            apiUrl: "https://msamgan.dev",
                            maxResults: 30
                        }
                    }
                },
                youtubeEmbed: YoutubeEmbed,
                delimiter: Delimiter
            },
            onReady: async (api) => {
                // console.log("Editor.js is ready to work!")
            },
            onChange: async (api, event) => {
                // console.log(await api.saver.save())
                setContent(await api.saver.save())
            },
            data: data.content
        })
    }

    useEffect(() => {
        setListingData(
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

        getTagList()

        editor.current = initEditor()
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Posts" />}
            subMenu={
                <div className="flex space-x-2">
                    <DrawerButton
                        title="Add Post"
                        dataObject={dataObject}
                        setData={setData}
                        openDrawer={openDrawer}
                        setOpenDrawer={setOpenDrawer}
                    />
                </div>
            }
        >
            <Head title="Posts" />

            <Main>
                <Table
                    columns={columns}
                    data={listingData}
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                    searchFormExtension={searchFormExtension}
                    totalDataRows={posts.total}
                    from={posts.from}
                    to={posts.to}
                    nextPage={posts.next_page_url}
                    previousPage={posts.prev_page_url}
                />

                <Drawer open={openDrawer} side="right" setOpen={setOpenDrawer}>
                    <FormSection headerTitle={pageData.headerTitle} headerDescription={pageData.description}>
                        <Form
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            recentlySuccessful={recentlySuccessful}
                            onSubmit={onSubmit}
                            tagList={tagList}
                        />
                    </FormSection>
                </Drawer>
            </Main>
        </AuthenticatedLayout>
    )
}

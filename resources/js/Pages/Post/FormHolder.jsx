import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import { Head, useForm } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Form from "@/Pages/Post/Form.jsx"
import FormSection from "@/Components/FormSection.jsx"
import { pageDataObject, postDataObject } from "@/Pages/Post/methods.js"
import { useCallback, useEffect, useRef, useState } from "react"
import axios from "axios"

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
import ZenLayout from "@/Layouts/ZenLayout.jsx"
import SecondaryButton from "@/Components/SecondaryButton.jsx"
import ZenFormSection from "@/Components/ZenFormSection.jsx"

export default function FormHolder({ auth, postData = null }) {
    const dataObject = postDataObject(postData)

    const { data, setData } = useForm(dataObject)

    const [processing, setProcessing] = useState(false)
    const [recentlySuccessful, setRecentlySuccessful] = useState(false)
    const [errors, setErrors] = useState({})

    const [pageData, setPageData] = useState(pageDataObject(postData))

    const [tagList, setTagList] = useState([])
    const [content, setContent] = useState(postData ? postData.content : {})
    const editor = useRef(null)

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
                        window.history.pushState({}, "", route("post.edit", response.data.id))
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
        getTagList()

        editor.current = initEditor()

        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "s" || e.metaKey && e.key === "s") {
                e.preventDefault()
                document.getElementById("savePostBtn").click()
            }
        })
    }, [])

    return (
        <ZenLayout user={auth.user} header={<HeaderTitle title={pageData.title} />}>
            <Head title={pageData.title} />

            {data.featured_image && (
                <Main>
                    <img
                        src={data.featured_image}
                        alt={data.title}
                        className="object-cover h-64 max-w-full rounded-lg"
                    />
                </Main>
            )}

            <Main>
                <ZenFormSection
                    backRoute={route("post")}
                    backText="Back to Posts"
                >
                    <div className="float-right"></div>
                    <Form
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        recentlySuccessful={recentlySuccessful}
                        onSubmit={onSubmit}
                        tagList={tagList}
                    />
                </ZenFormSection>
            </Main>
        </ZenLayout>
    )
}

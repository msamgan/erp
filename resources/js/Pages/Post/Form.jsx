import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import InputError from "@/Components/InputError.jsx"
import { Transition } from "@headlessui/react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { useEffect } from "react"

import EditorJS from "@editorjs/editorjs"
import Header from "@editorjs/header"
import Paragraph from "@editorjs/paragraph"
import CodeTool from "@editorjs/code"
import List from "@editorjs/list"
import InlineCode from "@editorjs/inline-code"
import Quote from "@editorjs/quote"
import Delimiter from "@editorjs/delimiter"

import "./editor.css"

export default function Form({ data, setData, errors, processing, recentlySuccessful, onSubmit }) {
    useEffect(() => {
        const editor = new EditorJS({
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
                delimiter: Delimiter
            },
            onChange: (api, event) => {
                editor.save().then((outputData) => {
                    setData("content", outputData)
                })
            }
        })
    }, [])

    return (
        <form onSubmit={onSubmit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Title" isRequired={true} />
                <TextInput
                    id="title"
                    className="block w-full mt-1"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    isFocused
                    autoComplete="title"
                />
                <InputError className="mt-2" message={errors.title} />
            </div>
            <div>
                <InputLabel htmlFor="editor" value="Content" isRequired={true} />
                <div id="editor" className="mt-4" />
            </div>
            <div className="flex gap-4">
                <div className={"w-1/2"}>
                    <InputLabel htmlFor="status" value="Status" isRequired={true} />
                    <select
                        id="status"
                        className="block w-full mt-1 text-lg rounded-md shadow-sm border-primary focus:border-teal-950"
                        defaultValue={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    <InputError className="mt-2" message={errors.status} />
                </div>
                <div className={"w-1/2"}>
                    <InputLabel htmlFor="featured_image" value="Featured Image" />
                    <TextInput
                        id="featured_image"
                        className="block w-full mt-1"
                        value={data.featured_image}
                        onChange={(e) => setData("featured_image", e.target.value)}
                        autoComplete="featured_image"
                    />
                    <small className="text-gray-500">URL of the image</small>
                    <InputError className="mt-2" message={errors.featured_image} />
                </div>
            </div>
            <div>
                <InputLabel htmlFor="excerpt" value="Excerpt" />
                <textarea
                    id="excerpt"
                    className="block w-full mt-1 text-lg rounded-md shadow-sm border-primary focus:border-teal-950"
                    value={data.excerpt}
                    onChange={(e) => setData("excerpt", e.target.value)}
                />
                <small className="text-gray-500">Max 160 characters</small>
                <InputError className="mt-2" message={errors.excerpt} />
            </div>
            <div>
                <InputLabel htmlFor="meta_description" value="Meta Description" />
                <textarea
                    id="meta_description"
                    className="block w-full mt-1 text-lg rounded-md shadow-sm border-primary focus:border-teal-950"
                    value={data.meta_description}
                    onChange={(e) => setData("meta_description", e.target.value)}
                />
                <small className="text-gray-500">Max 160 characters</small>
                <InputError className="mt-2" message={errors.meta_description} />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form>
    )
}

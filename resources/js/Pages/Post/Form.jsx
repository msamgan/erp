import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import InputError from "@/Components/InputError.jsx"
import { Transition } from "@headlessui/react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { useEffect, useState } from "react"

export default function Form({
    data,
    setData,
    errors,
    processing,
    recentlySuccessful,
    onSubmit,
    toolbarOptions
}) {
    const [quill, setQuill] = useState(null)

    useEffect(() => {
        setQuill(
            new Quill("#content", {
                placeholder: "Compose an epic...",
                theme: "bubble",
                modules: {
                    toolbar: toolbarOptions
                }
            })
        )
    }, [data])

    return (
        <form onSubmit={onSubmit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Title" isRequired={true} />
                <TextInput
                    id="title"
                    className="mt-1 block w-full"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    isFocused
                    autoComplete="title"
                />
                <InputError className="mt-2" message={errors.title} />
            </div>
            <div>
                <InputLabel htmlFor="content" value="Content" isRequired={true} />
                <div
                    id="content"
                    className="mt-1 block border-primary w-full focus:border-teal-950 rounded-md shadow-sm text-lg h-60"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                ></div>
            </div>
            <div className="flex gap-4">
                <div className={"w-1/2"}>
                    <InputLabel htmlFor="status" value="Status" isRequired={true} />
                    <select
                        id="status"
                        className="mt-1 block border-primary w-full focus:border-teal-950 rounded-md shadow-sm text-lg"
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
                        className="mt-1 block w-full"
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
                    className="border-primary focus:border-teal-950 rounded-md shadow-sm text-lg mt-1 block w-full"
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
                    className="border-primary focus:border-teal-950 rounded-md shadow-sm text-lg mt-1 block w-full"
                    value={data.meta_description}
                    onChange={(e) => setData("meta_description", e.target.value)}
                />
                <small className="text-gray-500">Max 160 characters</small>
                <InputError className="mt-2" message={errors.meta_description} />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton
                    onClick={(e) => {
                        e.preventDefault()
                        setData("content", quill.root.innerHTML)
                        onSubmit()
                    }}
                    disabled={processing}
                >
                    Save
                </PrimaryButton>

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
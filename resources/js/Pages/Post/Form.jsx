import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import InputError from "@/Components/InputError.jsx"
import { Transition } from "@headlessui/react"
import PrimaryButton from "@/Components/PrimaryButton.jsx"

export default function Form({ data, setData, errors, processing, recentlySuccessful, onSubmit, tagList }) {
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
            {data.slug && (
                <div>
                    <InputLabel htmlFor="slug" value="Slug" isRequired={true} />
                    <TextInput
                        id="slug"
                        className="block w-full mt-1"
                        value={data.slug}
                        onChange={(e) => setData("slug", e.target.value)}
                        autoComplete="slug"
                    />
                    <InputError className="mt-2" message={errors.slug} />
                </div>
            )}
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

            <div className="relative mt-1.5">
                <InputLabel htmlFor="Tag" value="Tags" />
                <TextInput
                    type="text"
                    list="tagList"
                    id="Tag"
                    className="block w-full mt-1"
                    placeholder="Please select"
                    onKeyUp={(e) => {
                        if (e.key === ",") {
                            let tag = e.target.value.slice(0, -1)
                            setData("tags", [...data.tags, tag])
                            e.target.value = ""
                        }
                    }}
                />
                <small className="text-gray-500">Press comma to add a tag</small>

                <datalist name="Tag" id="tagList">
                    {tagList.map((tag, index) => (
                        <option key={index}>{tag.name}</option>
                    ))}
                </datalist>
            </div>

            <div>
                {data.tags.length > 0 && (
                    <>
                        <div className="flex items-center mb-2 gap-2">
                            {data.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-sm text-gray-900 bg-gray-200 rounded-lg"
                                    onClick={() => {
                                        setData(
                                            "tags",
                                            data.tags.filter((t) => t !== tag)
                                        )
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <small className="mt-4 text-gray-500">Click the tag to remove</small>
                    </>
                )}
            </div>

            <div>
                <InputLabel htmlFor="editor" value="Content" isRequired={true} />
                <div id="editor" className="mt-4" />
                <InputError className="mt-2" message={errors.content} />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton
                    id="savePostBtn"
                    disabled={processing}>Save</PrimaryButton>

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

import React, { useCallback, useEffect, useState } from "react"

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
// import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation)

export default function Media() {
    const [files, setFiles] = useState([])
    const [photos, setPhotos] = useState([])
    const [notification, setNotification] = useState(null)

    const getPhotos = useCallback(async () => {
        axios
            .get(route("media.photos"))
            .then((response) => {
                setPhotos(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        getPhotos().then((r) => {})
    }, [getPhotos])

    return (
        <div className={"mt-5"}>
            <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={1}
                server={{
                    url: route("media.store"),
                    process: {
                        headers: {
                            "X-CSRF-TOKEN": document
                                .querySelector('meta[name="csrf-token"]')
                                .getAttribute("content")
                        },
                        onload: (response) => {
                            getPhotos().then()
                        }
                    }
                }}
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />

            <div className="mt-2">{notification && <div className="text-gray-400">{notification}</div>}</div>

            <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {photos.map((photo) => {
                    return (
                        <div key={photo.name} className="relative">
                            <img
                                src={photo.url}
                                alt={photo.name}
                                onClick={() => {
                                    let url = photo.url
                                    url = url.split("?")[0]
                                    navigator.clipboard.writeText(url)

                                    setNotification("Copied to clipboard")
                                    setTimeout(() => {
                                        setNotification(null)
                                    }, 2000)
                                }}
                                className="w-full h-48 object-cover rounded-lg cursor-pointer"
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

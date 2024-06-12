import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { useState } from "react"
import PrimaryLink from "@/Components/PrimaryLink.jsx"

export default function Unsplash({ queryParams, photos }) {
    const [search, setSearch] = useState(queryParams.search || "")
    const [notification, setNotification] = useState(null)

    return (<div className={"mt-3"}>
        <fieldset className="w-full space-y-1 text-gray-800">
            <label htmlFor="Search" className="hidden">Search</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                        <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-gray-800">
                            <path
                                d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                        </svg>
                    </button>
                </span>
                <form>
                    <input type="search" name="search" placeholder="Search..."
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           className="w-2/3 py-1.5 pl-10 text-sm rounded-md bg-gray-100 text-gray-800" />
                    <PrimaryButton className={"ml-3"} title="Search">
                        Search
                    </PrimaryButton>
                </form>
            </div>
        </fieldset>

        <div>
            <div className="mt-2">
                {notification && <div className="text-gray-400">{notification}</div>}
            </div>
            <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {photos.map((photo) => {
                    return (<div key={photo.id} className="relative">
                        <img src={photo.urls.small} alt={photo.alt_description}
                             onClick={() => {
                                 let url = photo.urls.full
                                 url = url.split("?")[0]
                                 navigator.clipboard.writeText(url)

                                 setNotification("Copied to clipboard")
                                 setTimeout(() => {
                                     setNotification(null)
                                 }, 2000)
                             }}
                             className="w-full h-48 object-cover rounded-lg cursor-pointer" />
                    </div>)
                })}

                <div className="mt-2">
                    {
                        queryParams.page && parseInt(queryParams.page) > 1 && <PrimaryLink
                            href={route("media.unsplash", {
                                ...queryParams,
                                page: parseInt(queryParams.page || 1) - 1
                            })}
                            className={"mr-2 h-8"} title="Previous">
                            Previous
                        </PrimaryLink>
                    }

                    {
                        photos && photos.length > 0 && <PrimaryLink
                            href={route("media.unsplash", {
                                ...queryParams,
                                page: parseInt(queryParams.page || 1) + 1
                            })}
                            className={"h-8"}
                            title="Next"
                        >
                            Next
                        </PrimaryLink>
                    }

                </div>
            </div>


        </div>
    </div>)
}

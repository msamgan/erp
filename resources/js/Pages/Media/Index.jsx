import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import HeaderTitle from "@/Components/HeaderTitle.jsx"
import PrimaryLink from "@/Components/PrimaryLink.jsx"
import { Head, Link } from "@inertiajs/react"
import Main from "@/Components/Main.jsx"
import Media from "@/Pages/Media/Media.jsx"
import Unsplash from "@/Pages/Media/Unsplash.jsx"
import { useState } from "react"

export default function Index({ auth, media, photos = [] }) {
    const [queryParams, setQueryParams] = useState(
        Object.fromEntries(new URLSearchParams(window.location.search).entries())
    )

    const tabCss = "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-gray-600 text-gray-600"
    const tabActiveCss =
        "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border border-b-0 rounded-t-lg border-gray-600 text-gray-900"

    const TabMenu = () => {
        return (
            <div className="flex items-center -mx-4 overflow-x-auto overflow-y-hidden sm:justify-start flex-nowrap text-gray-800">
                <Link
                    rel="noopener noreferrer"
                    href={route("media")}
                    className={route().current("media") ? tabActiveCss : tabCss}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                    >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <span>Media</span>
                </Link>
                <Link
                    rel="noopener noreferrer"
                    href={route("media.unsplash")}
                    className={route().current("media.unsplash") ? tabActiveCss : tabCss}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>Unsplash</span>
                </Link>
            </div>
        )
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title="Media" />}
            subMenu={''}
        >
            <Head title="Media" />

            <Main>
                <TabMenu />
                {route().current("media") && <Media />}
                {route().current("media.unsplash") && <Unsplash queryParams={queryParams} photos={photos} />}
            </Main>
        </AuthenticatedLayout>
    )
}

import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { useEffect } from "react"

export default function SearchForm({ queryParams, setQueryParams, searchFormExtension = null }) {
    return (
        <form action={""} method="get">
            <div className="flex flex-row justify-end mb-4 space-x-2">
                {searchFormExtension && searchFormExtension()}

                <div className="flex flex-col">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        value={queryParams.search}
                        onChange={(e) => setQueryParams({ ...queryParams, search: e.target.value })}
                        className="h-10 px-2 border border-gray-300 rounded-md"
                    />
                    <small className="text-gray-500 ml-2 mt-0.5">search string</small>
                </div>
                <PrimaryButton type="submit" className="h-10 px-4 text-white bg-blue-500 rounded-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </PrimaryButton>
            </div>
        </form>
    )
}

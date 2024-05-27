import { projectStatuses } from "@/helpers/constants.js"
import PrimaryButton from "@/Components/PrimaryButton.jsx"

export default function SearchForm({ queryParams, setQueryParams }) {
    return (
        <form action={route("transaction")} method="get">
            <div className="flex flex-row space-x-2 justify-end">
                <div className="flex flex-col">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        value={queryParams.search}
                        onChange={(e) => setQueryParams({ ...queryParams, search: e.target.value })}
                        className="border border-gray-300 rounded-md h-10 px-2"
                    />
                    <small className="text-gray-500 ml-2 mt-0.5">search string</small>
                </div>
                <PrimaryButton type="submit" className="h-10 bg-blue-500 text-white px-4 rounded-md">
                    Search
                </PrimaryButton>
            </div>
        </form>
    )
}

import { Link } from "@inertiajs/react"

export default function NavLink({ active = false, className = "", children, ...props }) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 font-light text-sm leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-white text-gray-900 focus:border-white font-medium "
                    : "border-transparent hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ") +
                className
            }
        >
            {children}
        </Link>
    )
}

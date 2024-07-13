import { Link } from "@inertiajs/react"

export default function PrimaryLink({ className = "", disabled, title, href, ...props }) {
    return (
        <Link
            {...props}
            className={
                `inline-flex items-center px-4 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary focus:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
            href={href}
        >
            {title}
        </Link>
    )
}

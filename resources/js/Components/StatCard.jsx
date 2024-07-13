export default function StatCard({ icon, title, value }) {
    return (
        <div className="flex p-4 text-gray-800 rounded-lg space-x-4 md:space-x-6 bg-gray-50">
            <div className="flex justify-center p-2 align-middle bg-primary rounded-lg sm:p-4">{icon}</div>
            <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-light leading-none">{value}</p>
                <p className="mt-2 capitalize">{title}</p>
            </div>
        </div>
    )
}

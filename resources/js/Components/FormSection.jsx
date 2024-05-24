export default function FormSection({ children, headerTitle, headerDescription }) {
    return (
        <div className="shadow p-4 sm:rounded-lg border-left-primary">
            <section>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">{headerTitle}</h2>

                    <p className="mt-1 text-sm text-gray-600">{headerDescription}</p>
                </header>

                {children}
            </section>
        </div>
    )
}

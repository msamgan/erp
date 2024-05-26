export const createStatusAttribute = (status) => {
    return (
        <div className="flex space-x-1">
            {status === "completed" ? (
                <span className="px-2 py-1 rounded-md text-sm complete-badge-background">Completed</span>
            ) : (
                ""
            )}
            {status === "active" ? (
                <span className="px-2 py-1 rounded-md text-sm active-badge-background">Active</span>
            ) : (
                ""
            )}
            {status === "lead" ? (
                <span className="px-2 py-1 rounded-md text-sm lead-badges-background">Lead</span>
            ) : (
                ""
            )}
            {status === "cancelled" ? (
                <span className="px-2 py-1 rounded-md text-sm cancelled-badge-background">Cancelled</span>
            ) : (
                ""
            )}
        </div>
    )
}

export const createTypeAttribute = (type) => {
    return type === "singular" ? (
        <span className="px-2 py-1 rounded-md text-sm singular-badge-background">One Time</span>
    ) : (
        <span className="px-2 py-1 rounded-md text-sm recurring-badge-background">Monthly</span>
    )
}

export const createCostingAttribute = (costing) => {
    return costing.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

export const createDateAttribute = (date) => {
    if (date) {
        return new Date(date).toDateString()
    }

    return "-"
}

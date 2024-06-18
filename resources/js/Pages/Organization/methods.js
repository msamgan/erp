export const organizationDataObject = (organization = null) => {
    return {
        name: organization ? organization.name : "",
        location: organization ? organization.location : ""
    }
}

export const pageDataObject = (organization = null) => {
    return {
        type: organization ? "edit" : "create",
        title: organization ? "Update Organization" : "Add Organization",
        headerTitle: "Organization Information",
        description: organization
            ? "Update an existing organization with it's information."
            : "FormHolder a new organization with it's information.",
        actionUrl: organization ? route("organization.update", organization.id) : route("organization.store")
    }
}

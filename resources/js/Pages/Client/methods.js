export const clientDataObject = (client = null) => {
    return {
        name: client ? client.name : "",
        emails: client ? (client.emails ? client.emails.map((email) => email.email).join(", ") : "") : "",
        phones: client ? (client.phones ? client.phones.map((phone) => phone.phone).join(", ") : "") : "",
        organization: client ? (client.organization ? client.organization.name : "") : ""
    }
}

export const pageDataObject = (client = null) => {
    return {
        type: client ? "edit" : "create",
        title: client ? "Edit Client" : "Add Client",
        headerTitle: "Client Information",
        description: client
            ? "Edit the client's information."
            : "Create a new client with their information.",
        actionUrl: client ? route("client.update", client.id) : route("client.store")
    }
}

export const getOrganizationList = async () => {
    return axios(route("organization.list"))
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error(error)
        })
}

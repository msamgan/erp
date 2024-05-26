export const organizationDataObject = (organization = null) => {
    return {
        name: organization ? organization.name : "",
        location: organization ? organization.location : ""
    }
}

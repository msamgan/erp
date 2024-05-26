export const projectDataObject = (project = null) => {
    return {
        name: project ? project.name : "",
        client: project ? project.client.name : "",
        description: project ? project.description : "",
        type: project ? project.type : "singular",
        document_url: project ? project.document_url : "",
        status: project ? project.status : "lead",
        start_date: project ? project.start_date : "",
        end_date: project ? project.end_date : "",
        costing: project ? project.costing : ""
    }
}

export const getClientList = async () => {
    return axios(route("client.list"))
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error(error)
        })
}

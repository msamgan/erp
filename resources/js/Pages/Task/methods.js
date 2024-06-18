export const taskDataObject = (task = null) => {
    return {
        name: task ? task.name : "",
        description: task ? task.description : "",
        project: task?.project ? task.project.name : "",
        due_date: task ? task.due_date : new Date().toISOString().split("T")[0],
        is_completed: task ? task.is_completed : false
    }
}

export const pageDataObject = (task = null) => {
    return {
        type: task ? "edit" : "create",
        title: task ? "Update Task" : "Add Task",
        headerTitle: "Task Information",
        description: task
            ? "Update an existing task with it's information."
            : "Create a new task with it's information.",
        actionUrl: task ? route("task.update", task.id) : route("task.store")
    }
}

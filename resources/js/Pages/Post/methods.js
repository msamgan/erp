export const postDataObject = (post = null) => {
    return {
        title: post ? post.title : "",
        excerpt: post ? post.excerpt : "",
        content: post ? post.content : "null",
        status: post ? post.status : "draft",
        featured_image: post ? post.featured_image : "",
        meta_description: post ? post.meta_description : "",
        slug: post ? post.slug : "",
        tags: post?.tags ? post.tags.map((tag) => tag.name) : []
    }
}

export const pageDataObject = (post = null) => {
    return {
        type: post ? "edit" : "create",
        title: post ? "Edit Post" : "Create Post",
        headerTitle: "Post Information",
        description: post
            ? "Update an existing Post with It's information."
            : "Create a new Post with details.",
        actionUrl: post ? route("post.update", post.id) : route("post.store")
    }
}

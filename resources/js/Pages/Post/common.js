export const postDataObject = (post = null) => {
    return {
        title: post ? post.title : "",
        excerpt: post ? post.excerpt : "",
        content: post ? post.content : "",
        status: post ? post.status : "draft",
        featured_image: post ? post.featured_image : "",
        meta_description: post ? post.meta_description : "",
        tags: post ? post.tags : []
    }
}

export const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block", "code"],
    ["link"],

    [{ header: 1 }, { header: 2 }, { header: 3 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ align: [] }],

    ["clean"] // remove formatting button
]

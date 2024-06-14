export const appendQueryParamsToUrl = (queryParams, url) => {
    if (!url) {
        return null
    }

    let urlParams = Object.fromEntries(new URLSearchParams(url.split("?")[1]).entries())

    let params = {
        ...queryParams,
        ...urlParams
    }

    let newUrl = url.split("?")[0]

    let queryString = Object.keys(params)
        .map((key) => {
            return key + "=" + params[key]
        }, [])
        .join("&")

    return newUrl + "?" + queryString
}

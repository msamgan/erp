import { forwardRef, useEffect, useRef } from "react"

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    return (
        <input
            {...props}
            type={type}
            className={"border-primary focus:border-primary rounded-md shadow-sm text-lg " + className}
            ref={input}
        />
    )
})
